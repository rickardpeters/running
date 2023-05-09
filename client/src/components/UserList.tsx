import React, { useState, useEffect } from 'react';
import { Button, Modal, List, ListItem } from '@mui/material';
import { db } from '../firebase';

const UsersModal = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
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
        <div>
          <h2>Users</h2>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <span>{user.name}</span>
              </ListItem>
            ))}
          </List>
        </div>
      </Modal>
    </>
  );
};

export default UsersModal;
