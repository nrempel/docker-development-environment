const express = require('express');
const pg = require('pg');
const redis = require('redis');
const amqp = require('amqplib/callback_api');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Test Postgres connection
app.get('/postgres/:blurb', (req, res) => {
  const ip = req.connection.remoteAddress;
  const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  db.connect((err, client, done) => {
    client.query('create table if not exists "blurbs" ("id" serial primary key, "text" varchar(255))', (err, result) => {
      client.query('insert into "blurbs" ("text") values ($1)', [req.params.blurb], (err, result) => {
        client.query('select * from "blurbs"', (err, result) => {
          const blurbs = result.rows.map((o) => o.text);
          res.send(`List of blurbs:\n${blurbs.join(' ')}`);
          client.end();
          done();
        });
      });
    });
  });
});

// Test Redis connection
app.get('/redis', (req, res) => {
  const client = redis.createClient(process.env.REDIS_URL);
  client.incr('count', (err, reply) => {
    res.send(`Request count: ${reply}`);
  });
});

// Test RabbitMQ connection
app.get('/rabbit/:msg', (req, res) => {
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    conn.createChannel((err, ch) => {
      const q = 'web';
      ch.assertQueue(q, { durable: false });
      ch.sendToQueue(q, Buffer.from(req.params.msg));
    });
    res.send('Message sent to worker process; check your terminal!');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
