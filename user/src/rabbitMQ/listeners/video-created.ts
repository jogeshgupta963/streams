import { Channel, Connection, ConsumeMessage } from "amqplib";
import Video, { Genre } from "../../models/Video";

interface VideoDoc {
  _id: string;
  name: string;
  released: string;
  video: string;
  description: string;
  genre: Genre;
}

export class VideoCreatedListener {
  private client: Connection;
  private channel!: Channel;
  private queueName = "video:created";
  constructor(client: Connection) {
    this.client = client;
  }

  async listen() {
    this.channel = await this.client.createChannel();
    await this.channel.assertQueue(this.queueName);
    this.channel.consume(this.queueName, (msg) => {
      console.log(msg);
      const parsedData = JSON.parse(msg!.content.toString());
      this.onMessage(parsedData, msg!);
    });
  }
  async onMessage(data: VideoDoc, msg: any) {
    console.log(msg, "from video:created");
    const video = new Video({
      _id: data._id,
      name: data.name,
      released: data.released,
      video: data.video,
      description: data.description,
      genre: data.genre,
    });
    await video.save();
    this.channel.ack(msg);
  }
}
