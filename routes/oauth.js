const express = require('express');
const request = require('superagent');
const router = express.Router();
const shops = require('../repositories/shops');

router.get('/install', function(req, res, next) {
    const platform = req.query.platform;
    const shop = req.query.shop;

    const domain = process.env.BOLD_CHECKOUT_DOMAIN;
    const client_id = process.env.CLIENT_ID;

    if (!platform || !shop) {
        res.status(400).send('Unable to complete request: missing parameters');
    }

    const scope = [
        'provide_shipping_rates',
        'add_fee',
        'modify_order',
        'modify_shipping_address',
        'modify_shipping',
        'read_shipping_lines',
    ].join(' ');

    res.redirect(
        `https://${domain}/api/v1/${platform}/${shop}/oauth/authorize?client_id=${client_id}&scope=${scope}&response_type=code`
    );
});

router.get('/authorize', function(req, res, next) {
    const platform = req.query.platform;
    const shop = req.query.shop;
    const code = req.query.code;

    if (!code || !platform || !shop) {
        res.status(400).send('Missing required parameters.');
    }

    const domain = process.env.BOLD_CHECKOUT_DOMAIN;
    const requestData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
    };

    request
        .post(`https://${domain}/api/v1/${platform}/${shop}/oauth/access_token`)
        .send(requestData)
        .set('accept', 'json')
        .then(resp => {
            const accessToken = resp.body.access_token;
            shops.removeAccessToken(shop, platform);
            shops.saveAccessToken(shop, platform, accessToken);

            // At this point the app is free to redirect the user wherever it wants.
            // This example redirects back into the Checkout admin.
            res.redirect(
                `https://${domain}/admin/${platform}/${shop}/marketplace`
            );
        })
        .catch(err => {
            //TODO: report error
            res.status(500).end();
        });
});

router.post('/uninstalled', function(req, res, next) {
    res.status(200);
    res.send({});

    const platform = req.query.platform;
    const shop = req.query.shop;
    shops.removeAccessToken(shop, platform);
});

module.exports = router;
