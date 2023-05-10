import React, { useState, useEffect } from 'react';
import { Button, Modal, List, ListItem, Container } from '@mui/material';
import { auth } from '../firebase';

interface User {
  uid: string;
  email: string |  null;
}

const UserModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const usersData: User[] = [{ uid: user.uid, email: user.email }];
        setUsers(usersData);
      }
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick}>Open Modal</Button>
      <Modal open={open} onClose={handleClose}>
      <Container sx={{ p: 2, width: 300, bgcolor: 'background.paper' }}>
          <h2>Active users</h2>
          <List>
            {users.map((user) => (
              <ListItem key={user.uid}>
                <span>{user.email}</span>
              </ListItem>
            ))}
          </List>
        </Container>
      </Modal>
    </>
  );
};

export default UserModal;
