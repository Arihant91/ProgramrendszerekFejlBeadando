const express = require('express');
const router = express.Router();
const passport = require('passport')

const mongoose = require('mongoose');




const productModel = mongoose.model('product');
const userModel = mongoose.model('user');


router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        passport.authenticate('local', function (error, user) {
            if (error) return res.status(500).send(error);
            req.logIn(user, function (error) {
                if (error) {
                    req.session.user = user;
                    req.session.userId = user._id;
                    return res.status(500).send(error);
                }
                return res.status(200).send('Bejelentkezes Sikeres');
            })
        })(req, res);
    } else {
        return res.status(400).send('Hibas keres, username es password kell');
    }
})

router.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logOut();
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(400).send('Nem is volt bejelentkezve');
    }
})

router.route('/products').get((req, res, next) => {
    if (req.isAuthenticated()) {
        productModel.find({}, (err, products) => {
            console.log('product lekérés meghívódott')
            if (err) return res.status(500).send('DB hiba');
            res.status(200).send(products);
        })
    } else {
        return res.status(400).send('Nem is volt bejelentkezve');
    }
}).post((req, res, next) => {
    if(req.user.accessLevel != 'admin'){
        console(req.session.user.accessLevel)
        return res.status(403).send('nincs jogosultság populálni')
    }
    if (req.body.name && req.body.price && req.body.id) {
        productModel.findOne({ name: req.body.name }, (err, product) => {
            if (product) res.status(400).send('már van ilyen termék');
            const product1 = new productModel({ name: req.body.name, price: req.body.price, id: req.body.id })
            product1.save((error) => {
                if (error) return res.status(500).send('hiba mentes soran ' + error);
                return res.status(200).send('sikeres mentes');
            })
        })
    }
}).put((req, res, next) => {
    if(req.user.accessLevel != 'admin'){
        return res.status(403).send('nincs jogosultság updatere')
    }
    if (req.body.id) {
        productModel.findOne({ id: req.body.id }, (error, product) => {
            if (product) {

                product.name = req.body.name ?? product.name;
                product.price = req.body.price ?? product.price;
                product.save((error) => {
                    if (error) return res.status(500).send('hiba mentes soran ' + error);
                    return res.status(200).send('sikeres mentes');
                })
            }
        })
    }
}).delete((req, res, next) => {
    if(req.user.accessLevel != 'admin'){
        return res.status(403).send('te itt nem fogsz kitorolni lofaszt se')
    } 
    if (req.body.id) {
        productModel.findOne({ id: req.body.id }, (err, product) => {
            if (err) return res.status(500).send('DB hiba');
            if (product) {
                product.delete((error) => {
                    if (error) return res.status(500).send('hiba a mentés során')
                    return res.status(400).send('siekeres torles');
                })
            } else {
                return res.status(400).send('nincs ilyen id');
            }
        })
    }

})

router.route('/user').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send('DB hiba');
        res.status(200).send(users);
    })
}).post((req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
        userModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) return res.status(500).send('DB hiba');
            if (user) {
                return res.status(400).send('mar van iyen')
            }
            const usr = new userModel({ username: req.body.username, password: req.body.password, email: req.body.email, accessLevel: 'admin' });
            usr.save();
        })
    } else {
        return res.status(400).send('hibas keres, username, pass es email kell')
    }
})

module.exports = router;