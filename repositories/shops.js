const db = require('../helpers/database');

function saveShopAccessToken(shop, platform, accessToken)
{
    const sql = `INSERT INTO shops (shop, platform, access_token) VALUES (?,?,?)`;
    db.executeInsert(sql, shop, platform, accessToken);
}

function getShopAccessToken(shop, platform)
{
    const sql = `SELECT access_token FROM shops WHERE shop=? AND platform=?`;
    const rows = db.executeSelect(sql, shop, platform);

    if (rows.length > 0) {
        return rows[0]['access_token'];
    }

    return null;
}

function removeShopAccessToken(shop, platform)
{
    const sql = `DELETE FROM shops WHERE shop=? AND platform=?`;
    db.executeDelete(sql, shop, platform);
}

module.exports = {
    saveAccessToken: saveShopAccessToken,
    getAccessToken: getShopAccessToken,
    removeAccessToken: removeShopAccessToken,
};
