const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/invoice-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const InvoiceSchema = new mongoose.Schema({
    invoiceNo: String,
    fromAddress: String,
    fromCity: String,
    fromPostcode: String,
    fromCountry: String,
    clientName: String,
    clientEmail: String,
    clientAddress: String,
    clientCity: String,
    clientPostcode: String,
    clientCountry: String,
    invoiceDate: Date,
    paymentTerms: Number,
    projectDescription: String,
    itemList: [
        {
            itemName: String,
            quantity: Number,
            price: Number,
        },
    ],
    paymentStatus: String,
});

const Invoice = mongoose.model('Invoices', InvoiceSchema);

module.exports = { Invoice };
