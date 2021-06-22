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
    fromPostcode: string;
    fromCountry: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientCity: string;
    clientPostcode: string;
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

export const invoiceSchema = yup.object({
    invoiceNo: yup.string().required(),
    fromAddress: yup.string().required(),
    fromCity: yup.string().required(),
    fromPostcode: yup.string().required(),
    fromCountry: yup.string().required(),
    clientName: yup.string().required(),
    clientEmail: yup.string().required().email(),
    clientAddress: yup.string().required(),
    clientCity: yup.string().required(),
    clientPostcode: yup.string().required(),
    clientCountry: yup.string().required(),
    invoiceDate: yup.string().required(),
    paymentTerms: yup.number().default(30).max(365),
    projectDescription: yup.string().notRequired(),
    itemList: yup
        .array()
        .of(
            yup.object({
                itemName: yup.string().required(),
                quantity: yup.number().required().min(1),
                price: yup.number().required().min(0.01),
            })
        )
        .min(1),
    paymentStatus: yup
        .mixed<PaymentStatus>()
        .required()
        .default('unpaid')
        .oneOf(['paid', 'unpaid', 'pending', 'draft']),
});
