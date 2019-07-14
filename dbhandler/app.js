const processMessages = require('./logic/rabbitmq');
const db = require('./logic/dbcreator');

processMessages((msg) => {

    const addData = (tableName, data) => {
        return db(tableName).insert(data).then(() => {
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        });
    }

    let success;
    
    if (msg.author) {
        success = addData('authors', msg.author);
    } else if (msg.book) {
        success = addData('books', msg.book);
    }

    if (success) {
        return {
            ok: true,
            msg: 'New data inserted'
        }
    } else {
        return {
            ok: false,
            msg: 'Data wasn\'t inserted'
        }
    }
});