const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    
    if (err) {
        console.error('amqp connection error:', err);
        return;
    }

    connection.createChannel((err, channel) => {
        
        if (err) {
            console.error('amqp create channel error:', err);
            return;
        }
        
        const queue = 'rpc_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.prefetch(1);
        
        console.log('Awaiting RPC requests');
        channel.consume(queue, (msg) => {
        
            const data = JSON.parse(msg.content);
            console.log('Recieved:', data);

            var res = {
                ok: true,
                msg: 'Data recieved',
                data
            };

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(JSON.stringify(res)), {
                    correlationId: msg.properties.correlationId
                });

            channel.ack(msg);
        });
    });
});