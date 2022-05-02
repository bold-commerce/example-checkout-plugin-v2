const sqlite3 = require('better-sqlite3');
const path = require('path');

function getDb() {
    const dbPath = path.resolve(__dirname, ['..', 'sample.db'].join(path.sep));
    return new sqlite3(dbPath);
}

function executeWithoutResult(statement, ...values) {
    const db = getDb();

    db.prepare(statement).run([...values]);
    db.close();
}

function executeSelect(statement, ...values) {
    const db = getDb();

    const rows = db.prepare(statement).all([...values]);
    db.close();

    return rows;
}

function executeInsert(statement, ...values) {
    executeWithoutResult(statement, ...values);
}

function executeDelete(statement, ...values) {
    executeWithoutResult(statement, ...values);
}

module.exports = {
    executeSelect,
    executeInsert,
    executeDelete,
};