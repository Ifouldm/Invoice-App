<template>
    <div class="invoice">
        <div @click.prevent="$router.back()" class="back-btn">
            &#60; Go back
        </div>
        <div class="toolbar">
            <div class="start">
                <span>Status&nbsp;</span>
                <Status :status="invoice.paymentStatus" />
            </div>
            <div class="end">
                <div class="button dark" @click="editInv()">Edit</div>
                <div class="button warning" @click="deleteInv()">Delete</div>
                <div class="button" @click="markPaid()">Mark as Paid</div>
            </div>
        </div>
        <div class="invoice-data">
            <div class="row">
                <div class="cell">
                    <h1 class="invoiceNo">
                        <span class="hash">#</span>{{ invoice.invoiceNo }}
                    </h1>
                    <h3>{{ invoice.projectDescription }}</h3>
                </div>
                <div class="cell">
                    <div class="address">
                        <div>{{ invoice.fromAddress }}</div>
                        <div>{{ invoice.fromCity }}</div>
                        <div>{{ invoice.fromCountry }}</div>
                        <div>{{ invoice.fromPostcode }}</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <div class="cell">
                        <span class="title">Invoice Date</span>
                        <span class="body">{{
                            formatDate(invoice.invoiceDate)
                        }}</span>
                    </div>
                    <div class="cell">
                        <span class="title">Payment Due</span>
                        <span class="body"> {{ dueDate() }} </span>
                    </div>
                </div>
                <div class="cell">
                    <span class="title"> Bill to </span>
                    <div class="address">
                        <div>{{ invoice.clientName }}</div>
                        <div>{{ invoice.clientAddress }}</div>
                        <div>{{ invoice.clientCity }}</div>
                        <div>{{ invoice.clientPostcode }}</div>
                        <div>{{ invoice.clientEmail }}</div>
                    </div>
                </div>
                <div class="cell">
                    <span class="title"> Sent to </span>
                    <div class="bold">{{ invoice.clientEmail }}</div>
                </div>
            </div>
            <div class="invoice-table">
                <table>
                    <tr>
                        <th>Line No</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    <tr v-for="(line, index) in invoice.itemList" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ line.itemName }}</td>
                        <td>{{ line.quantity }}</td>
                        <td>{{ formatPrice(line.price) }}</td>
                    </tr>
                </table>
            </div>
            <div class="row invoice-total">
                Amount Due<span>{{ invoiceTotal() }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import axios from 'axios';
import { Invoice } from '../types';
import Status from '../components/Status.vue';
import { useRouter, useRoute } from 'vue-router';

const apiAddress = 'http://localhost:3000/api';

export default defineComponent({
    setup() {
        const invoice = ref({} as Invoice);

        const router = useRouter();
        const route = useRoute();

        const getInvoice = function () {
            axios
                .get(`${apiAddress}/invoice?invoiceNo=${route.query.invoiceNo}`)
                .then((res) => {
                    invoice.value = res.data;
                })
                .catch((err) => console.error(err));
        };

        onMounted(getInvoice);

        const formatDate = function (date: string | Date) {
            const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
            const formattedDate = date instanceof Date ? date : new Date(date);
            return `${formattedDate.getDate()} ${
                months[formattedDate.getMonth()]
            } ${formattedDate.getFullYear()}`;
        };

        const dueDate = function () {
            const dateDue = new Date(invoice.value.invoiceDate);
            dateDue.setDate(dateDue.getDate() + invoice.value.paymentTerms);
            return formatDate(dateDue);
        };

        const formatPrice = function (price: number) {
            return `£${price.toFixed(2)}`;
        };

        const invoiceTotal = function () {
            if (!invoice.value.itemList) return formatPrice(0);
            return formatPrice(
                invoice.value.itemList.reduce(
                    (total, line) => line.quantity * line.price + total,
                    0
                )
            );
        };

        const markPaid = function () {
            axios
                .patch(
                    `${apiAddress}/invoice?invoiceNo=${invoice.value.invoiceNo}`,
                    { paymentStatus: 'paid' }
                )
                .then((res) => {
                    console.log(res.data);

                    invoice.value = res.data;
                })
                .catch((err) => console.error(err));
        };

        const deleteInv = function () {
            axios
                .delete(
                    `${apiAddress}/invoice?invoiceNo=${invoice.value.invoiceNo}`
                )
                .then(() => router.push('/'))
                .catch((err) => console.error(err));
        };

        const editInv = function () {
            router.push({
                path: '/editInvoice',
                query: { invoiceNo: invoice.value.invoiceNo },
            });
        };

        return {
            invoice,
            formatDate,
            dueDate,
            formatPrice,
            invoiceTotal,
            markPaid,
            deleteInv,
            editInv,
        };
    },
    components: {
        Status,
    },
});
</script>

<style lang="scss" scoped>
.back-btn {
    align-self: flex-start;
    padding: 1rem;
    font-weight: 700;
    color: var(--White);
    cursor: pointer;
}

.back-btn::first-letter {
    color: var(--PurpleAccent);
}

.toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--DarkBlue);
    padding: 1rem 2rem;
}

.invoice-data {
    width: 100%;
    background-color: var(--DarkBlue);
    padding: 2rem;

    .row {
        display: flex;
        justify-content: space-between;
        .cell {
            display: flex;
            flex-direction: column;
            > * {
                margin-bottom: 0.8rem;
            }
        }
    }

    .address > * {
        margin-bottom: 0.3rem;
    }

    .hash {
        color: var(--Grey);
    }

    .title {
        font-size: 0.8rem;
    }

    .body {
        color: var(--White);
        font-weight: 700;
    }

    .bold {
        font-weight: 700;
    }

    h1 {
        color: var(--White);
    }
}

.invoice-table {
    border-radius: 0.8rem 0.8rem 0 0;
    background-color: var(--DarkBlueEmphasis);
    padding: 1rem;

    table {
        width: 100%;

        th,
        td {
            padding: 1rem;
            background-color: var(--VeryDarkBlue);
        }
    }
}

.invoice-total {
    border-radius: 0 0 0.8rem 0.8rem;
    background-color: var(--AlmostBlack);
    padding: 2rem;
}

.end {
    display: flex;
}
</style>
