<template>
    <router-link
        class="card"
        :to="{ path: 'Invoice', query: { invoiceNo: invoice.invoiceNo } }"
    >
        <span class="invoiceNo">
            <span class="hash">#</span>
            {{ invoice.invoiceNo }}
        </span>
        <span class="dateDue">{{ formattedDuedate() }}</span>
        <span class="name">{{ invoice.clientName }}</span>
        <span class="amount">{{ formattedAmount() }}</span>
        <Status :status="invoice.paymentStatus" />
        <span class="details">&#62;</span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Invoice, InvoiceLine } from '../types';
import Status from '../components/Status.vue';

export default defineComponent({
    props: {
        invoice: {
            type: Object as PropType<Invoice>,
            required: true,
        },
    },
    components: {
        Status,
    },
    setup(props) {
        const formattedAmount = function () {
            const itemList = props.invoice.itemList as InvoiceLine[];
            const total = itemList.reduce((acc: number, line) => {
                return line.quantity * line.price + acc;
            }, 0);

            return `£${total.toFixed(2)}`;
        };

        const formattedDuedate = function () {
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
            const dateDue = new Date(props.invoice.invoiceDate);
            dateDue.setDate(dateDue.getDate() + props.invoice.paymentTerms);
            return `Due ${dateDue.getDate()} ${
                months[dateDue.getMonth()]
            } ${dateDue.getFullYear()}`;
        };

        const status = function () {
            switch (props.invoice.paymentStatus) {
                case 'paid':
                    return 'paid';
                case 'unpaid':
                    return 'unpaid';
                case 'pending':
                    return 'pending';
                case 'draft':
                    return 'draft';
                default:
                    return '';
            }
        };

        return { formattedAmount, formattedDuedate, status };
    },
});
</script>

<style lang="scss" scoped>
.card {
    text-decoration: none;
    color: var(--Grey);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 2fr 1fr 1fr;
    align-items: center;
    background-color: var(--DarkBlue);
    border-radius: 0.5rem;
    margin: 1rem 0;
    padding: 1.2rem;
    font-size: 0.8rem;
}

.invoiceNo {
    .hash {
        color: var(--Grey);
    }
    color: var(--White);
    font-weight: 700;
}

.amount {
    color: var(--White);
    font-weight: 700;
    font-size: 1rem;
}

.details {
    text-align: center;
    padding: 1rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--PurpleAccent);
}
</style>
