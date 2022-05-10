const express = require('express');
const verifyRequest = require('../middleware/verifyRequest');
const router = express.Router();

router.use(verifyRequest);

router.post('/inventory', (req, res) => {
    const inventoryCheckPasses = true;

    const items = req.body.items.map(item => {
        return {
            ...item,
            available_quantity: inventoryCheckPasses ? item.quantity : 0,
        }
    });

    res.status(200);
    res.send({
        type: req.body.type,
        items: items,
    });
});

module.exports = router;