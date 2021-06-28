<template>
    <div class="NewInvoice">
        <form @submit.prevent="onSubmit">
            <div class="section">
                <div class="section-heading">Bill from</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Street Address</label>
                        <input
                            v-model.trim="form.fromAddress"
                            type="text"
                            :class="errors.fromAddress ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.fromAddress }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromCity">City</label>
                        <input
                            v-model.trim="form.fromCity"
                            type="text"
                            :class="errors.fromCity ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.fromCity }}</span>
                    </div>
                    <div class="form-field">
                        <label for="fromPostcode">Postcode</label>
                        <input
                            v-model.trim="form.fromPostcode"
                            type="text"
                            :class="errors.fromPostcode ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.fromPostcode }}</span>
                    </div>
                    <div class="form-field">
                        <label for="fromCountry">Country</label>
                        <input
                            v-model.trim="form.fromCountry"
                            type="text"
                            :class="errors.fromCountry ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.fromCountry }}</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-heading">Bill To</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientName">Client's Name</label>
                        <input
                            v-model.trim="form.clientName"
                            type="text"
                            :class="errors.clientName ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientName }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientEmail">Client's Email</label>
                        <input
                            v-model.trim="form.clientEmail"
                            type="text"
                            :class="errors.clientEmail ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientEmail }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientAddress">Street Address</label>
                        <input
                            v-model.trim="form.clientAddress"
                            type="text"
                            :class="errors.clientAddress ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientAddress }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="clientCity">City</label>
                        <input
                            v-model.trim="form.clientCity"
                            type="text"
                            :class="errors.clientCity ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientCity }}</span>
                    </div>
                    <div class="form-field">
                        <label for="clientPostcode">Postcode</label>
                        <input
                            v-model.trim="form.clientPostcode"
                            type="text"
                            :class="errors.clientPostcode ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientPostcode }}</span>
                    </div>
                    <div class="form-field">
                        <label for="clientCountry">Country</label>
                        <input
                            v-model.trim="form.clientCountry"
                            type="text"
                            :class="errors.clientCountry ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.clientCountry }}</span>
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
                        <span class="error">{{ errors.invoiceDate }}</span>
                    </div>
                    <div class="form-field">
                        <label for="paymentTerms">Payment Terms</label>
                        <input
                            v-model.number="form.paymentTerms"
                            type="text"
                            :class="errors.paymentTerms ? 'error-field' : ''"
                        />
                        <span class="error">{{ errors.paymentTerms }}</span>
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
                            :class="
                                errors.projectDescription ? 'error-field' : ''
                            "
                        />
                        <span class="error">{{
                            errors.projectDescription
                        }}</span>
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
                                :class="errors.itemName ? 'error-field' : ''"
                            />
                            <input
                                type="number"
                                v-model.number="itemRow.quantity"
                                :class="errors.quantity ? 'error-field' : ''"
                            />
                            <input
                                type="text"
                                v-model.number="itemRow.price"
                                :class="errors.price ? 'error-field' : ''"
                            />
                            <input
                                type="text"
                                readonly
                                :value="itemRow.price * itemRow.quantity"
                            />
                            <div class="delete-item" @click="delLine(index)">
                                &#128465;
                            </div>
                        </template>
                        <span class="error">{{ errors.itemList }}</span>
                    </div>
                    <a class="button muted add-item" @click="addNewItem()">
                        + Add New Item
                    </a>
                </div>
            </div>
            <div class="section buttons">
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
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted } from 'vue';
import { Invoice, invoiceSchema, PaymentStatus } from '../types';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
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
        const store = useStore();

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

        onMounted(() => {
            if (route.query.invoiceNo) {
                axios
                    .get(
                        `${apiAddress}/invoice?invoiceNo=${route.query.invoiceNo}`
                    )
                    .then((res) => {
                        Object.assign(form, res.data);
                        validate();
                    })
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error loading invoice: ' + err
                        )
                    );
            }
        });

        const {
            errors,
            handleSubmit,
            isSubmitting,
            values: form,
        } = useForm<Invoice>({
            validateOnMount: false,
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
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error updating invoice: ' + err
                        )
                    );
            } else {
                axios
                    .post(`${apiAddress}/invoice`, form)
                    .then(() => router.push('/'))
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error inserting new invoice: ' + err
                        )
                    );
            }
        });

        const addNewItem = function () {
            if (form.itemList)
                form.itemList.push({
                    itemName: '',
                    quantity: 1,
                    price: 0,
                });
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
            isSubmitting,
            isFormDirty,
            isFormValid,
            errors,
            validate,
        };
    },
});
</script>

<style lang="scss" scoped>
label {
    display: block;
}

.error-field {
    border-bottom: 2px solid red;
}

.form-row {
    width: 100%;
    display: flex;
    gap: 1rem;
}

.form-field {
    display: flex;
    flex-direction: column;
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

    .add-item {
        margin: 1rem 0;
    }

    .delete-item {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.buttons {
    display: flex;
    gap: 1rem;
}
</style>
