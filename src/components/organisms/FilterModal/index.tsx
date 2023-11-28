import { createContext, useCallback, useContext, useEffect, useState, } from 'react';
import { useBackdrop } from '../../../hooks/backdrop';
import { useFeedback } from '../../../hooks/addFeedback';
import { Box, Modal, Typography } from '@mui/material';
import ModalGeneric from '../../atoms/ModalGeneric';

interface FilterModalProps {
    open: boolean;
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FilterModal = ({ open, handleClose }: FilterModalProps) => {

    return (
        <ModalGeneric
            open={open}
            handleClose={handleClose}
            title='Filtre seu evento'
        >
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </ModalGeneric>
    );
}

export default FilterModal;
