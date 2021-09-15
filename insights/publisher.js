const amqplib = require("amqplib");
const amqpUrl = process.env.AMQP_URL;

const publishMsg = async (type, subject, body) => {
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  try {
    const exchange = process.env.EXCHANGE;
    const queue = process.env.QUEUE;
    const routingKey = process.env.ROUTING_KEY;

    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    const msg = { type, subject, body };
    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(msg))
    );
    console.log("Message published");
  } catch (e) {
    console.error("Error in publishing message", e);
  } finally {
    await channel.close();
    await connection.close();
  }
};

module.exports = publishMsg;
