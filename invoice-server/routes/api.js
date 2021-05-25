var express = require('express');
var router = express.Router();

var { Invoice } = require('../database');

/* GET invoices listing. */
router.get('/invoices', function (req, res, next) {
    Invoice.find((err, docs) => {
        if (err) res.send(err);
        else res.send(docs);
    });
});

/* POST invoice listing. */
router.post('/invoice', function (req, res, next) {
    const newInvoice = new Invoice(req.body);
    Invoice.create(newInvoice);
    res.status(201).send('Invoice Added');
});

/* Put invoice listing. */
router.put('/invoice', function (req, res, next) {
    const invNo = req.query.invoiceNo;
    const newInvoice = new Invoice(req.body);
    Invoice.replaceOne({ invoiceNo: invNo }, newInvoice, {}, (err, result) => {
        if (err) res.send(err);
        else res.status(200).send('Update successful');
    });
});

/* PATCH invoice listing. */
router.patch('/invoice', function (req, res, next) {
    const invNo = req.query.invoiceNo;
    const modifictation = req.body;
    Invoice.findOneAndUpdate(
        { invoiceNo: invNo },
        { $set: modifictation },
        {},
        (err) => {
            if (err) res.status(500).send('Error updating invoice');
            else
                Invoice.findOne({ invoiceNo: invNo }, (_, doc) =>
                    res.send(doc)
                );
        }
    );
});

/* DELETE users listing. */
router.delete('/invoice', function (req, res, next) {
    const invNo = req.query.invoiceNo;
    Invoice.deleteOne({ invoiceNo: invNo }, {}, (err) => {
        if (err) console.error(err);
    });
    res.status(200).send('Invoice Deleted');
});

/* GET single invoice listing. */
router.get('/invoice', function (req, res, next) {
    const invNo = req.query.invoiceNo;
    Invoice.findOne({ invoiceNo: invNo }, (err, doc) => {
        if (err) res.send(err);
        else if (!doc)
            res.status(404).send(
                'Unable to find record ' + req.params.invoiceNo
            );
        else res.send(doc);
    });
});

module.exports = router;
