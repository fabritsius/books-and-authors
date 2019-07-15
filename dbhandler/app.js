const processMessages = require('./logic/rabbitmq');
const db = require('./logic/dbcreator');

processMessages(async (msg) => {

    const addData = (tableName, data) => {

        for (let key in data) {
            if (!data[key]) {
                return Promise.resolve(false);
            }
        }

        return db(tableName).insert(data).then(() => {
            return true;
        }).catch((err) => {
            return false;
        });
    }

    let success;
    
    if (msg.author) {
        success = await addData('authors', msg.author);
    } else if (msg.book) {
        success = await addData('books', msg.book);
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