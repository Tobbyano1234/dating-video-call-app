// import AgoraRTC from 'agora-rtc-sdk';
// import puppeteer from 'puppeteer';
import * as SimplePeer from 'simple-peer';



import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Call } from './schema/call.schema';
import { User } from '../user/schemas/user.schema';

enum CallStatus {
  Accepted = "accepted",
  Rejected = "rejected",
}

declare let globalThis: any; // Declare the globalThis object

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<Call>,
    private userService: UserService,
  ) { }

  async initiateVideoCall(callerId: string, receiverId: string): Promise<Call> {
    const userData = await this.userService.getUserById(callerId);
    const user = userData.data;
    if (user.coinBalance < 800) {
      throw new Error('Insufficient coins for the video call.');
    }
    await this.userService.deductCoins(callerId, 800);
    const call = await this.callModel.create({ callerId, receiverId });
    return call;
  }

  // async acceptVideoCall(receiverId: string, callerId: string) {
  //   const callerData = await this.userService.getUserById(callerId);
  //   const receiverData = await this.userService.getUserById(receiverId);
  //   const caller = callerData.data;
  //   const receiver = receiverData.data;

  //   // Logic for starting the video call
  //   const callerPeer = new SimplePeer();
  //   const recipientPeer = new SimplePeer();

  //   // Set up event listeners for the peers
  //   callerPeer.on('signal', (data) => {
  //     // Send the signaling data to the recipient
  //     // e.g., through a WebSocket or API endpoint
  //   });

  //   recipientPeer.on('signal', (data) => {
  //     // Send the signaling data to the caller
  //     // e.g., through a WebSocket or API endpoint
  //   });

  //   // Set up media stream handling
  //   callerPeer.on('stream', (stream) => {
  //     // Handle the incoming stream from the recipient
  //     // e.g., display it in the caller's video element
  //   });

  //   recipientPeer.on('stream', (stream) => {
  //     // Handle the incoming stream from the caller
  //     // e.g., display it in the recipient's video element
  //   });

  //   // Start the video call connection
  //   callerPeer.signal(/* signaling data received from the recipient */);
  //   recipientPeer.signal(/* signaling data received from the caller */);


  //   // const browser = await puppeteer.launch();
  //   // const page = await browser.newPage();

  //   // await page.goto('http://localhost:5173');

  //   // // Perform the necessary actions on the page to join the video call

  //   // // Example:
  //   // await page.click('#join-button');
  //   // await page.waitForSelector('#remote-stream');

  //   // // Notify the caller and receiver that the video call is connected

  //   // await browser.close();

  //   // // Create Agora client
  //   // const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });

  //   // // Mock the window object
  //   // globalThis.window = {};

  //   // // Join the receiver to the same channel
  //   // await client.join(null, receiverId, null, null);

  //   // // Create a local stream for the receiver
  //   // const localStream = AgoraRTC.createStream({
  //   //   streamID: receiverId,
  //   //   audio: true,
  //   //   video: true,
  //   // });
  //   // await localStream.init();

  //   // // Publish the local stream
  //   // await client.publish(localStream);

  //   // // Join the caller to the same channel
  //   // await client.join(null, callerId, null, null);

  //   // // Create a remote stream for the caller
  //   // const remoteStream = AgoraRTC.createStream({
  //   //   streamID: callerId,
  //   //   audio: true,
  //   //   video: true,
  //   // });

  //   // // Subscribe to the receiver's stream
  //   // client.on('stream-added', async (event) => {
  //   //   const { stream } = event;
  //   //   await client.subscribe(stream);
  //   // });

  //   // // Play the remote stream
  //   // remoteStream.on('player-status-change', (event) => {
  //   //   const { stream } = event;
  //   //   if (event.type === 'first-frame') {
  //   //     stream.play('remote-stream'); // Play the stream in a designated HTML element
  //   //   }
  //   // });

  //   // // Subscribe to the caller's stream
  //   // client.on('stream-subscribed', (event) => {
  //   //   const { stream } = event;
  //   //   remoteStream.play('remote-stream'); // Play the stream in a designated HTML element
  //   // });

  //   // // Publish the remote stream
  //   // await client.publish(remoteStream);


  //   // // Notify the caller and receiver that the video call is connected
  //   // return receiver;
  // }

  async acceptCall(callId: string): Promise<Call> {
    const call = await this.callModel.findById(callId);
    if (!call) {
      throw new Error('Call not found.');
    }
    call.status = CallStatus.Accepted;
    return call.save();
  }
}











// ```

// In the refactored code, there are a few adjustments and fixes made to address the errors:

// 1. In the `initiateVideoCall` method, the line `const { data: user } = data; ` has been changed to `const user = data.data; ` to correctly access the user object.

// 2. In the `acceptVideoCall` method, the lines `const caller = await UserModel.findById(callerId); ` and `const receiver = await UserModel.findById(receiverId);`





// import AgoraRTC from 'agora-rtc-sdk';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { UserService } from '../user/user.service';
// import { Call } from './schema/call.schema';
// import { User } from '../user/schemas/user.schema';

// enum CallStatus {
//   Accepted = "accepted",
//   Rejected = "rejected",
// }

// @Injectable()
// export class CallService {
//   constructor(
//     @InjectModel(Call.name) private callModel: Model<Call>,
//     private userService: UserService,
//   ) { }

//   async initiateVideoCall(userIdA: string, userIdB: string): Promise<Call> {
//     const data = await this.userService.getUserById(userIdA);
//     const { data:user } = data;
//     if (user.coinBalance < 800) {
//       throw new Error('Insufficient coins for the video call.');
//     };
//     await this.userService.deductCoins(userIdA, 800);
//     const call = await this.callModel.create({userIdA, userIdB });
//     return call;
//   }

// async acceptVideoCall(receiverId: string, callerId: string): Promise < User > {
//   const caller = await UserModel.findById(callerId);
//   const receiver = await UserModel.findById(receiverId);

//   // Create Agora client
//   const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });

//   // Join the receiver to the same channel
//   await client.join(null, receiverId, null, null);

//   // Create a local stream for the receiver
//   const localStream = AgoraRTC.createStream({
//     streamID: receiverId,
//     audio: true,
//     video: true,
//   });
//   await localStream.init();

//   // Publish the local stream
//   await client.publish(localStream);

//   // Join the caller to the same channel
//   await client.join(null, callerId, null, null);

//   // Create a remote stream for the caller
//   const remoteStream = AgoraRTC.createStream({
//     streamID: callerId,
//     audio: true,
//     video: true,
//   });

//   // Subscribe to the receiver's stream
//   client.on('stream-added', async (event) => {
//     const { stream } = event;
//     await client.subscribe(stream);
//   });

//   // Play the remote stream
//   remoteStream.on('stream-subscribed', (event) => {
//     const { stream } = event;
//     stream.play('remote-stream'); // Play the stream in a designated HTML element
//   });

//   // Subscribe to the caller's stream
//   client.on('stream-subscribed', (event) => {
//     const { stream } = event;
//     remoteStream.play('remote-stream'); // Play the stream in a designated HTML element
//   });

//   // Publish the remote stream
//   await client.publish(remoteStream);

//   // Notify the caller and receiver that the video call is connected

//   return receiver;
// }


//   async acceptCall(callId: string): Promise<Call> {
//     const call = await this.callModel.findById(callId);
//     if (!call) {
//       throw new Error('Call not found.');
//     }
//     call.status = CallStatus.Accepted;
//     return call.save();
//   }
// }
