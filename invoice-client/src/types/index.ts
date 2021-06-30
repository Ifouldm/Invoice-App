import * as yup from 'yup';

export interface InvoiceLine {
    itemName: string;
    quantity: number;
    price: number;
}

export type PaymentStatus = 'paid' | 'unpaid' | 'pending' | 'draft';

export interface Invoice {
    invoiceNo: string;
    fromAddress: string;
    fromCity: string;
    fromPostcode?: string | null;
    fromCountry: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientCity: string;
    clientPostcode?: string | null;
    clientCountry: string;
    invoiceDate: string;
    paymentTerms: number;
    projectDescription?: string;
    itemList: InvoiceLine[];
    paymentStatus: PaymentStatus;
}

export interface Wishlist {
    _id?: string;
    itemName: string;
    description?: string;
    link?: string;
    imageUrl?: string;
    quantity: number;
    price: number;
    dateAdded?: Date;
    wishlistName: string;
}

function isCurrency(num: number | undefined) {
    return num
        ? num.toString().substring(num.toString().indexOf('.') + 1).length <= 2
        : false;
}

export const invoiceSchema = yup.object({
    invoiceNo: yup.string().required().label('Invoice Number'),
    fromAddress: yup.string().required().label('From Address'),
    fromCity: yup.string().required().label('From City'),
    fromPostcode: yup.string().nullable().label('From Postcode'),
    fromCountry: yup.string().required().label('From Country'),
    clientName: yup.string().required().label('Client Name'),
    clientEmail: yup.string().required().email().label('Client Email'),
    clientAddress: yup.string().required().label('Client Address'),
    clientCity: yup.string().required().label('Client City'),
    clientPostcode: yup.string().nullable().label('Client Postcode'),
    clientCountry: yup.string().required().label('Client Country'),
    invoiceDate: yup.string().required().label('Invoice Date'),
    paymentTerms: yup
        .number()
        .required()
        .oneOf([30, 60, 90])
        .label('Payment Terms (Days)'),
    projectDescription: yup.string().notRequired().label('Project Description'),
    itemList: yup
        .array()
        .of(
            yup
                .object({
                    itemName: yup.string().required().label('Item Name'),
                    quantity: yup.number().required().min(1).label('Quantity'),
                    price: yup
                        .number()
                        .required()
                        .test(
                            'currency',
                            'Currency field must have a maximum of 2 decimal places',
                            isCurrency
                        )
                        .min(0.01)
                        .label('Price'),
                })
                .label('Item')
        )
        .min(1),
    paymentStatus: yup
        .mixed<PaymentStatus>()
        .required()
        .default('unpaid')
        .oneOf(['paid', 'unpaid', 'pending', 'draft'])
        .label('Payment Status'),
});
