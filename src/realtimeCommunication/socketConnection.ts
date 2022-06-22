import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { updateDirectChatHistoryIfActive } from './updateChat';

interface DirectMessage {
  receiverUserId: string | undefined;
  content: string;
}

interface ServerToClientEvents {
  directChatHistory: (receiverUserId: string) => void;
}

interface ClientToServerEvents {
  directMessage: (data: DirectMessage) => void;
  directChatHistory: (receiverUserId: string) => void;
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
};

// export const sendDirectMessage = (data: any) => {
//   console.log(data);
//   socket.emit('directMessage', data);
// };
export const sendDirectMessage = (data: DirectMessage) => {
  // console.log(data);
  socket.emit('directMessage', data);
};

export const getDirectChatHistory = (receiverUserId: string) => {
  // console.log(receiverUserId);
  socket.emit('directChatHistory', receiverUserId);
};
