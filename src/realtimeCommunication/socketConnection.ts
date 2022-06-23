import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { updateDirectChatHistoryIfActive } from './updateChat';
import { updateDirectCommentHistoryIfActive } from './updateComment';

interface DirectMessage {
  receiverUserId: string | undefined;
  content: string;
}

interface DirectComment {
  imageId: string | undefined;
  content: string;
  parentCommentId: string | null;
}

interface ServerToClientEvents {
  directChatHistory: (receiverUserId: string) => void;
  directCommentHistory: (imageId: string) => void;
}

interface ClientToServerEvents {
  directMessage: (data: DirectMessage) => void;
  directChatHistory: (receiverUserId: string) => void;
  directComment: (data: DirectComment) => void;
  directCommentHistory: (imageId: string) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
// let socket: any = null;

// eslint-disable-next-line import/prefer-default-export
export const connectWithSocketServer = function () {
  const jwtToken: string | undefined = Cookies.get('refreshToken');
  // console.log(jwtToken);
  socket = io('http://localhost:3008', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    console.log('successfully connected to socket server');
    console.log(socket.id);
  });

  socket.on('directChatHistory', (data: any) => {
    // console.log('directChatHistory');
    // console.log(data);
    updateDirectChatHistoryIfActive(data);
  });

  socket.on('directCommentHistory', (data: any) => {
    // console.log('directCommentHistory');
    // console.log(data);
    updateDirectCommentHistoryIfActive(data);
  });
};

export const sendDirectMessage = (data: DirectMessage) => {
  // console.log(data);
  socket.emit('directMessage', data);
};

export const getDirectChatHistory = (receiverUserId: string) => {
  // console.log(receiverUserId);
  socket.emit('directChatHistory', receiverUserId);
};

export const sendDirectComment = (data: DirectComment) => {
  // console.log(data);
  socket.emit('directComment', data);
};

export const getDirectCommentHistory = (imageId: string) => {
  console.log('getDirectCommentHistory', imageId);
  socket.emit('directCommentHistory', imageId);
};
