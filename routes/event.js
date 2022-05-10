const express = require('express');
const verifyRequest = require('../middleware/verifyRequest');
const router = express.Router();

router.use(verifyRequest);

router.post('/', (req, res) => {
    let actions;

    switch (req.body.event) {
        case 'initialize_checkout':
            actions = handleInitializeCheckout(req);
            break;
        case 'order_submitted':
            actions = handleOrderSubmitted(req);
            break;
        default:
            actions = [];
    }

    res.send({
        success: true,
        actions: actions,
    });
});

function handleInitializeCheckout(req) {
    const publicOrderId = req.body.order.public_order_id;

    return [
        {
            type: 'OVERRIDE_INVENTORY',
            data: {
                url: process.env.APP_URL + '/overrides/inventory',
            }
        },
        {
            type: 'ADD_NOTE',
            data: {
                note: 'The example checkout plugin has initialized order ' + publicOrderId,
            }
        }
    ];
}

function handleOrderSubmitted(req) {
    let actions = [];
    const orderShippingCountryCode = req.body.customer.shipping.country_code;

    if (orderShippingCountryCode === 'US') {
        actions = [
            {
                type: 'ADD_FEE',
                data: {
                    'id': 'fee-1',
                    'line_text': 'Cross-border shipping',
                    'fee_type': 'fixed',
                    'taxable': 'true',
                    'value': 1500,
                    'is_amendment': false,
                },
            },
        ];
    }

    return actions;
}

module.exports = router;
