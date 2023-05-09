import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase';
import SendMessage from './SendMessage';
import Message from './Message';

interface MessageType {
  id: string;
  text: string;
  createdAt: any;
  uid: string;
}

const MessagingComponent = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages: MessageType[] = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({
          ...doc.data({ serverTimestamps: 'estimate' }),
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          uid: doc.data().uid,
        });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ width: '100%', height: 560, mb: 2 }}>
      <Box
        sx={{
          width: '100%',
          height: 500,
          mb: 1,
          border: 'solid',
          bgcolor: 'white',
          borderWidth: '0.7px',
          borderRadius: '5px',
          borderColor: 'gray',
          overflowY: 'auto',
        }}>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <SendMessage scroll={messagesEndRef}></SendMessage>
    </Box>
  );
};

export default MessagingComponent;
