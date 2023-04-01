import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  image: string;
}

const Modal: React.FC<Props> = ({ open, handleClose, title, image }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden' }}>
        <img src={image} alt={title} style={{ maxHeight: 'calc(100vh - 200px)', maxWidth: '100%', objectFit: 'contain'  }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;