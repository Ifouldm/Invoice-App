import { shallowMount } from '@vue/test-utils';
import InvoiceCard from '@/components/InvoiceCard.vue';
import { Invoice } from '@/types';

describe('InvoiceCard.vue', () => {
    const dummyInvoice = {
        invoiceNo: 'J220',
        clientName: 'Test Name',
        clientAddress: 'Test Add',
        clientCity: 'Test City',
        clientCountry: 'Test Country',
        clientEmail: 'test@test.com',
        clientPostcode: 'TEST',
        fromAddress: 'Test From Add',
        fromCity: 'Test From City',
        fromCountry: 'Test From Country',
        fromPostcode: 'Test From POCO',
        invoiceDate: Date(),
        paymentStatus: 'paid',
        paymentTerms: 30,
        projectDescription: 'Test description',
        itemList: [
            {
                itemName: 'Test item name',
                price: 30,
                quantity: 2,
            },
        ],
    } as Invoice;

    const wrapper = shallowMount(InvoiceCard, {
        props: { invoice: dummyInvoice },
        global: {
            stubs: ['router-link'],
        },
    });

    it('renders InvoiceCard', () => {
        expect(wrapper.exists);
    });

    it('Date formats correctly', async () => {
        const date = wrapper.find('.dateDue');
        expect(date.text()).toMatch(/Due \d\d? [A-Z][a-z][a-z] \d{4}/g);
    });

    it('Router links to valid invoice', async () => {
        const link = wrapper.find('.details');
        expect(link.attributes()['to']).not.toBe({
            path: 'Invoice',
            query: { invoiceNo: dummyInvoice.invoiceNo },
        });
    });
});
