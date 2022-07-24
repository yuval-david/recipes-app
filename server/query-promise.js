// MYSQL Query returns a promise
const db = require('./connect-db');

function Query(q) {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
};

module.exports = { Query };