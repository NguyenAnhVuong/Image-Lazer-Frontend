import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendDirectMessage } from '../realtimeCommunication/socketConnection';

const ChatId = function () {
  const [text, setText] = useState('');
  const { id } = useParams();
  return (
    <div>
      <h1>Irene</h1>
      <input type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
      <button type='button' onClick={() => sendDirectMessage({ receiverUserId: id, content: text })}> send </button>
    </div>
  );
};

export default ChatId;
