import {
  Backdrop,
  BackdropProps,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import './styles.css'

interface CustomBackDropProps extends BackdropProps {
  message?: string;
}

const CustomBackdrop: React.FC<CustomBackDropProps> = ({
  open,
  message,
}: CustomBackDropProps) => {

  return (
    <Backdrop
      sx={{ color: '#07142B', zIndex: 2000 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>

  );
};

export default CustomBackdrop;
