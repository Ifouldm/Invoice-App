var express = require('express');
var router = express.Router();

var { Wishlist } = require('../database');

/* GET wishlists */
router.get('/wishlists', function (req, res, next) {
    const agg = Wishlist.aggregate();
    agg.group({ _id: '$wishlistName', count: { $sum: 1 } });
    agg.then((val) => res.send(val)).catch((err) => console.error(err));
});

/* POST invoice listing. */
router.post('/wishlist', function (req, res, next) {
    const newWishlist = new Wishlist(req.body);
    Wishlist.create(newWishlist);
    res.status(201).send('Wishlist Added');
});

/* DELETE entire wishlist. */
router.delete('/wishlist', function (req, res, next) {
    const id = req.query.id;
    Wishlist.deleteOne({ _id: id }, {}, (err) => {
        if (err) console.error(err);
    });
    res.status(200).send('Invoice Deleted');
});

/* GET a particular wishlist */
router.get('/wishlist', function (req, res, next) {
    const name = req.query.name;
    Wishlist.find({ wishlistName: name }, (err, doc) => {
        if (err) res.send(err);
        else if (!doc)
            res.status(404).send('Unable to find record ' + req.params.name);
        else res.send(doc);
    });
});

module.exports = router;
