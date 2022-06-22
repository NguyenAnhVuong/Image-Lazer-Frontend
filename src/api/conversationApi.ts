import axiosJWT from './axiosJWT';

const conversationApi = {
  getConversationReceiverUserId: (userId: string) => axiosJWT.get(`/conversation/receiver/${userId}`),
};

export default conversationApi;
