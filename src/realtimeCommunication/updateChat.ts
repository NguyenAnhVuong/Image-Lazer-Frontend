import { store } from '../app/store';
import { chatActions, Message } from '../features/chat/chatSlice';

interface UpdateChatHistory {
  participants: any[];
  usersInConversation: any[];
  messages: Message[];
}

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}:UpdateChatHistory) => {
  const result = participants.every((participantId: any) => usersInConversation.includes(participantId));
  console.log(messages);

  if (result) {
    store.dispatch(chatActions.setMessages({ messages }));
  }
};

// eslint-disable-next-line import/prefer-default-export
export const updateDirectChatHistoryIfActive = (data:any) => {
  const { chosenChatDetails } = store.getState().chat;

  const { participants, messages } = data;

  const receiverId = chosenChatDetails?.id;
  const userId = localStorage.getItem('id');
  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];
    updateChatHistoryIfSameConversationActive({ participants, usersInConversation, messages });
  }
};