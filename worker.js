const amqp = require('amqplib/callback_api');

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    // Consume messages from web queue
    var q1 = 'web';
    ch.assertQueue(q1, { durable: false });
    ch.consume(q1, (msg) => {
      console.info('Message received from web process:', msg.content.toString());
    }, {noAck: true});

    // Consume messages from clock queue
    var q2 = 'clock';
    ch.assertQueue(q2, { durable: false });
    ch.consume(q2, (msg) => {
      console.info('Message received from clock process:', msg.content.toString());
    }, {noAck: true});
  });
});
