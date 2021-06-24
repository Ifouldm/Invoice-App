<template>
    <div class="invoices">
        <div class="row">
            <div class="header">
                <h1>Invoices</h1>
                <h5>
                    There are ~{{ totalPages * allInvoices.length }} total
                    invoices
                </h5>
                <h5>Displaying {{ invoices.length }} invoices</h5>
            </div>
        </div>
        <div class="row">
            <Filters @selected="filter" />
            <a class="button" @click="sortByPrice">Sort By Price</a>
            <router-link class="button add" to="EditInvoice">
                New Invoice
            </router-link>
        </div>
        <transition-group name="sort-list" mode="out-in" appear>
            <InvoiceCard
                v-for="invoice in invoices"
                :key="invoice.invoiceNo"
                :invoice="invoice"
            />
        </transition-group>
        <Pagination
            :total-records="totalPages * 50"
            :per-page="50"
            @pageChange="pageChange"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import axios from 'axios';
import InvoiceCard from '../components/InvoiceCard.vue';
import Filters from '../components/Filters.vue';
import { Invoice } from '../types';
import Pagination from '../components/Pagination.vue';

const apiAddress = 'http://localhost:3000/api';

export default defineComponent({
    setup() {
        const allInvoices = ref([] as Invoice[]);
        const invoices = ref([] as Invoice[]);
        const totalPages = ref(0);
        const currentPage = ref(1);

        const getInvoices = () => {
            axios
                .get(`${apiAddress}/invoices?page=${currentPage.value}`)
                .then((res) => {
                    totalPages.value = Number(res.data.totalPages);
                    currentPage.value = Number(res.data.currentPage);
                    allInvoices.value = res.data.invoices;
                    invoices.value = [...allInvoices.value];
                })
                .catch((err) => console.error(err));
        };

        const invoiceTotal = (invoice: Invoice) =>
            invoice.itemList.reduce(
                (total, curr) => total + curr.quantity * curr.price,
                0
            );

        const sortByPrice = function () {
            invoices.value.sort((a, b) => invoiceTotal(b) - invoiceTotal(a));
        };

        onMounted(getInvoices);

        const filter = function (term: 'all' | Invoice['paymentStatus']) {
            if (term === 'all') {
                invoices.value = [...allInvoices.value];
            } else {
                invoices.value = allInvoices.value.filter(
                    (inv) => inv.paymentStatus === term
                );
            }
        };

        const pageChange = (pageNo: number) => {
            currentPage.value = pageNo;
            getInvoices();
        };

        return {
            invoices,
            filter,
            allInvoices,
            sortByPrice,
            totalPages,
            currentPage,
            pageChange,
        };
    },
    components: {
        InvoiceCard,
        Filters,
        Pagination,
    },
});
</script>

<style scoped>
.sort-list-move {
    transition: all 1s ease;
}

.sort-list-enter-active {
    animation: flip 1s ease;
}

.sort-list-leave-active {
    animation: leave 1s ease-out;
}

@keyframes flip {
    0% {
        transform: scaleX(-1);
    }

    100% {
        transform: scaleX(1);
    }
}

@keyframes leave {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

.row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

h1 {
    margin: 0.5rem 0;
    color: var(--White);
}

h5 {
    margin: 0.5rem 0;
    color: var(--LightGrey);
}
</style>
