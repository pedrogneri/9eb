import React from 'react'
import { Modal as MuiModal, Box, SxProps } from '@mui/material';

type Props = {
  show?: boolean;
  onClose: Function;
  children: React.ReactChild;
}

const BOX_SX: SxProps = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: "#392a43",
  outline: 'none',
  color: "#eee",
};

const Modal = ({
  show, onClose, children,
}: Props) => {
  return (
    <MuiModal open={!!show} onClose={() => onClose()}>
      <Box
        sx={BOX_SX}
        flexDirection={"column"}
        alignItems={"center"}
        width={{ xs: "70%", sm: "40%", md: "30%" }}
        maxWidth={"500px"}
        borderRadius={4}
        padding={3}
      >
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;