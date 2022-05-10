const express = require('express');
const verifyRequest = require('../middleware/verifyRequest');
const router = express.Router();

router.use(verifyRequest);

router.get('/order/stream', (res, req) => {
    const webhookType = req.body.data.type;

    switch (webhookType) {
        case 'processed':
            // Perform operations for an order that has been processed by Checkout.
            break;
        case 'created':
            // Perform operations for an order that has been created on the platform.
            break;
        case 'fulfilled':
            // Perform operations for an order that has been fulfilled.
            break;
        case 'failed':
            // Perform operations for an order that failed to be created.
            break;
    }

    res.status(200);
    res.send();
});

module.exports = router;