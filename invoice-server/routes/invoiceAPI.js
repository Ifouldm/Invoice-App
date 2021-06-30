var express = require('express');
var router = express.Router();

var { Invoice } = require('../database');

/* GET invoices listing. */
router.get('/invoices', async (req, res) => {
    const { page = 1, limit = 50 } = req.query;
    try {
        const invoices = await Invoice.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Invoice.countDocuments();
        res.json({
            invoices,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching invoices');
    }
});

/* POST invoice listing. */
router.post('/invoice', async (req, res) => {
    const newInvoice = new Invoice(req.body);
    try {
        await Invoice.create(newInvoice);
        res.status(201).send('Invoice Added');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error adding invoice');
    }
});

/* Put invoice listing. */
router.put('/invoice', async (req, res) => {
    const invNo = req.query.invoiceNo;
    const newInvoice = new Invoice(req.body);
    try {
        await Invoice.updateOne({ invoiceNo: invNo }, newInvoice);
        res.status(200).send('Update successful');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error updating invoice');
    }
});

/* PATCH invoice listing. */
router.patch('/invoice', async (req, res) => {
    const invNo = req.query.invoiceNo;
    const modifictation = req.body;

    try {
        await Invoice.findOneAndUpdate(
            { invoiceNo: invNo },
            { $set: modifictation }
        );
        const invoice = await Invoice.findOne({ invoiceNo: invNo }).exec();
        if (!invoice) {
            res.status(404).send('Unable to find record ' + invNo);
        } else {
            res.json(invoice);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error updating invoice');
    }
});

/* DELETE users listing. */
router.delete('/invoice', async (req, res) => {
    const invNo = req.query.invoiceNo;
    try {
        await Invoice.deleteOne({ invoiceNo: invNo });
        res.status(200).send('Invoice Deleted');
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Error deleting invoice');
    }
});

/* GET single invoice listing. */
router.get('/invoice', async (req, res) => {
    const invNo = req.query.invoiceNo;

    try {
        const invoice = await Invoice.findOne({ invoiceNo: invNo }).exec();
        if (!invoice) {
            res.status(404).send('Unable to find record ' + invNo);
        } else {
            res.json(invoice);
        }
    } catch (error) {
        res.status(500).send('Error finding invoice');
    }
});

module.exports = router;
