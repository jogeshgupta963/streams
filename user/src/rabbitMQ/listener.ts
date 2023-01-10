import amqplib, { Channel, Connection } from "amqplib";
export class RabbitClient {
  private _client?: Connection;

  async connect(url: string) {
    this._client = await amqplib.connect(url);
    // const ch1 = await this._client.createChannel();
    // await ch1.assertQueue("video:created");
    // ch1.consume("video:created", (msg) => {
    //   console.log(msg);
    // });
  }

  get client() {
    if (!this._client) {
      throw new Error("Connection first");
    }
    return this._client;
  }
}

export const rmq = new RabbitClient();
