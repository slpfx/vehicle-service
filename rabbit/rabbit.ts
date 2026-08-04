import amqp from 'amqplib';

export default async function RabbitConnect() {
  const URL = 'amqp://guest:guest@localhost:5672';
  const QUEUE = 'user_queue';
  const connection = await amqp.connect(URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE);
  channel.consume(QUEUE, (msg) => {
    const message = JSON.parse(msg?.content.toString());
    if (message.pattern == 'user.create') {
      console.log('user has been created');
      channel.ack(msg!);
    }
  });
}
