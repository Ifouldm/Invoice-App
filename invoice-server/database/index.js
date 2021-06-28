const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, {
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

const WishListSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    imageUrl: String,
    link: String,
    dateAdded: { type: Date, default: Date.now },
    quantity: Number,
    price: Number,
    wishlistName: { type: String, default: 'default' },
});

const Wishlist = mongoose.model('Wishlist', WishListSchema);

module.exports = { Invoice, Wishlist };
