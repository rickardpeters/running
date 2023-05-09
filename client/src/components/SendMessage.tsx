import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, Button, TextField } from '@mui/material';

const SendMessage = ({ scroll }: any) => {
  const [message, setMessage] = useState<string>('');

  const sendMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log(auth.currentUser);
    if (message.trim() === '') {
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser!;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form onSubmit={sendMessage}>
      <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          id='messageInput'
          name='messageInput'
          type='text'
          variant='outlined'
          placeholder='Type message...'
          multiline
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxRows={2}
          sx={{ width: '100%', mr: 1, bgcolor: 'white' }}
        />
        <Button sx={{ height: 54 }} type='submit' variant='contained'>
          <SendIcon />
        </Button>
      </FormControl>
    </form>
  );
};
export default SendMessage;
