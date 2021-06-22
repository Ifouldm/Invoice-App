<template>
    <div class="NewInvoice">
        <form @submit.prevent="onSubmit">
            <div class="section">
                <div class="section-heading">Bill from</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Street Address</label>
                        <input v-model.trim="form.fromAddress" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromCity">City</label>
                        <input v-model.trim="form.fromCity" type="text" />
                    </div>
                    <div class="form-field">
                        <label for="fromPostcode">Postcode</label>
                        <input v-model.trim="form.fromPostcode" type="text" />
                    </div>
                    <div class="form-field">
                        <label for="fromCountry">Country</label>
                        <input v-model.trim="form.fromCountry" type="text" />
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-heading">Bill To</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientName">Client's Name</label>
                        <input v-model.trim="form.clientName" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientEmail">Client's Email</label>
                        <input v-model.trim="form.clientEmail" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientAddress">Street Address</label>
                        <input v-model.trim="form.clientAddress" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientCity">City</label>
                        <input v-model.trim="form.clientCity" type="text" />
                    </div>
                    <div class="form-field">
                        <label for="clientPostcode">Postcode</label>
                        <input v-model.trim="form.clientPostcode" type="text" />
                    </div>
                    <div class="form-field">
                        <label for="clientCountry">Country</label>
                        <input v-model.trim="form.clientCountry" type="text" />
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-heading">Invoice details</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            @input="dateChange"
                            :value="dateFormat()"
                            type="date"
                        />
                    </div>
                    <div class="form-field">
                        <label for="paymentTerms">Payment Terms</label>
                        <input v-model.number="form.paymentTerms" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="projectDescription">
                            Project Description
                        </label>
                        <input
                            v-model.trim="form.projectDescription"
                            type="text"
                        />
                    </div>
                </div>
                <div class="section">
                    <div class="section-subheading">Item List</div>
                    <div class="items-grid">
                        <div>Item Name</div>
                        <div>Qty.</div>
                        <div>Price</div>
                        <div>Total</div>
                        <div></div>
                        <template
                            v-for="(itemRow, index) in form.itemList"
                            :key="index"
                        >
                            <input
                                type="text"
                                v-model.trim="itemRow.itemName"
                            />
                            <input
                                type="number"
                                v-model.number="itemRow.quantity"
                            />
                            <input
                                type="number"
                                v-model.number="itemRow.price"
                            />
                            <input
                                type="text"
                                readonly
                                :value="itemRow.price * itemRow.quantity"
                            />
                            <div @click="delLine(index)">&#128465;</div>
                        </template>
                    </div>
                    <a class="button muted" @click="addNewItem()">
                        + Add New Item
                    </a>
                </div>
            </div>
            <div class="section">
                <a class="button muted" href="#" @click="back">Cancel</a>
                <input
                    type="submit"
                    class="button"
                    value="Save Changes"
                    :disabled="isSubmitting"
                />
                <a class="button" href="#" @click="validate">Validate</a>
                <span v-if="isFormValid && isFormDirty">VALID</span>
            </div>
            <div class="section">
                {{ errors }}
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { Invoice, invoiceSchema, PaymentStatus } from '../types';
import { useRouter, useRoute } from 'vue-router';
import {
    useForm,
    useIsFormDirty,
    useIsFormValid,
    useValidateForm,
} from 'vee-validate';

const apiAddress = 'http://localhost:3000/api';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        const generateInvNo = function () {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return (
                letters.charAt(Math.floor(Math.random() * letters.length)) +
                Math.floor(Math.random() * 99999)
            );
        };

        const initialValues = {
            invoiceNo: generateInvNo(),
            fromAddress: '',
            fromCity: '',
            fromPostcode: '',
            fromCountry: '',
            clientName: '',
            clientEmail: '',
            clientAddress: '',
            clientCity: '',
            clientPostcode: '',
            clientCountry: '',
            invoiceDate: Date(),
            paymentTerms: 30,
            projectDescription: '',
            itemList: [
                {
                    itemName: '',
                    quantity: 1,
                    price: 0.0,
                },
            ],
            paymentStatus: 'unpaid' as PaymentStatus,
        };

        const {
            errors,
            handleSubmit,
            isSubmitting,
            values: form,
        } = useForm<Invoice>({
            validationSchema: invoiceSchema,
            initialValues,
        });

        const dateFormat = function () {
            const date = new Date();

            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);

            return date.getFullYear() + '-' + month + '-' + day;
        };

        const back = function () {
            router.back();
        };

        const onSubmit = handleSubmit((form) => {
            if (route.query.invoiceNo) {
                axios
                    .put(
                        `${apiAddress}/invoice?invoiceNo=${route.query.invoiceNo}`,
                        form
                    )
                    .then(() => router.push('/'))
                    .catch((err) => console.error(err));
            } else {
                axios
                    .post(`${apiAddress}/invoice`, form)
                    .then(() => router.push('/'))
                    .catch((err) => console.error(err));
            }
        });

        const addNewItem = function () {
            if (form.itemList)
                form.itemList.push({ itemName: '', quantity: 1, price: 0 });
        };

        const delLine = function (index: number) {
            if (form.itemList) form.itemList.splice(index, 1);
        };

        const dateChange = function (event: InputEvent) {
            const dateField = event.target as HTMLInputElement;
            const newDate = new Date(dateField.value);
            form.invoiceDate = newDate.toISOString();
        };

        const isFormValid = useIsFormValid();
        const isFormDirty = useIsFormDirty();
        const validate = useValidateForm();

        return {
            back,
            generateInvNo,
            onSubmit,
            form,
            addNewItem,
            delLine,
            dateChange,
            dateFormat,
            errors,
            isSubmitting,
            isFormDirty,
            isFormValid,
            validate,
        };
    },
    created() {
        if (this.$route.query.invoiceNo) {
            axios
                .get(
                    `${apiAddress}/invoice?invoiceNo=${this.$route.query.invoiceNo}`
                )
                .then((res) => {
                    this.form = res.data;
                })
                .catch((err) => console.error(err));
        }
    },
});
</script>

<style lang="scss" scoped>
label {
    display: block;
}

.form-row {
    width: 100%;
    display: flex;
    gap: 1rem;
}

.form-field {
    margin: 1rem 0;
}

.section {
    margin: 2rem 0;

    .section-heading {
        margin: 1rem 0;
        font-weight: 700;
        color: var(--PurpleAccent);
    }

    .section-subheading {
        font-weight: 700;
        color: var(--Grey);
    }

    .items-grid {
        display: grid;
        grid-template-columns: 4fr 1fr 2fr 2fr 1fr;
        gap: 0.5rem;
    }
}
</style>
