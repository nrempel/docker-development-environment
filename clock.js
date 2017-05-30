const SimpleCron = require('simple-cron');
const cron = new SimpleCron();
const amqp = require('amqplib/callback_api');

cron.schedule('* * * * *', () => {
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    conn.createChannel((err, ch) => {
      const q = 'clock';
      ch.assertQueue(q, { durable: false });
      ch.sendToQueue(q, Buffer.from('hi.'));
    });
    console.log('Queuing new job!');
  });
});

cron.run();
