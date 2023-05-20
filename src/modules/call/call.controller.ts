import { Controller, Post, Body, Param } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import SimplePeer from 'simple-peer';
import { io, Socket as ClientSocket } from 'socket.io-client';
import { CallService } from './call.service';


@Controller('calls')
export class CallController {
  private socket: ClientSocket; 
  private peers: { [key: string]: SimplePeer.Instance };

  constructor(private callService: CallService) {
    this.socket = io('http://localhost:8000'); 
    this.peers = {};
  }

  @Post('start')
  async startVideoCall() {
    // Logic for starting the video call
    const callerPeer = new SimplePeer({ initiator: true, trickle: false });

    // Emit the signaling data to the recipient
    callerPeer.on('signal', (data) => {
      this.socket.emit('call', data);
    });

    // Set up media stream handling
    callerPeer.on('stream', (stream) => {
      // Handle the incoming stream from the recipient
      // e.g., display it in the caller's video element
    });

    // Start the video call connection
    callerPeer.start();

    // Save the caller's peer instance
    this.peers['caller'] = callerPeer;

    // Listen for incoming calls
    this.socket.on('call', (data) => {
      const recipientPeer = new SimplePeer({ trickle: false });

      // Emit the signaling data to the caller
      recipientPeer.on('signal', (response) => {
        this.socket.emit('answer', response);
      });

      // Set up media stream handling
      recipientPeer.on('stream', (stream) => {
        // Handle the incoming stream from the caller
        // e.g., display it in the recipient's video element
      });

      // Start the video call connection with the caller
      recipientPeer.signal(data);

      // Save the recipient's peer instance
      this.peers['recipient'] = recipientPeer;
    });

    // Listen for the answer from the recipient
    this.socket.on('answer', (response) => {
      callerPeer.signal(response);
    });
  }

  @Post(':callerId/initiate/:receiverId')
  async initiateCall(@Param('callerId') callerId: string, @Param('receiverId') receiverId: string) {
    return this.callService.initiateVideoCall(callerId, receiverId);
  }

  @Post(':callId/accept')
  async acceptCall(@Param('callId') callId: string) {
    return this.callService.acceptCall(callId);
  }
}
