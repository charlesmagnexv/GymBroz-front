import { Box, Grid, Modal } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '580px',
    height:'620px',
    bgcolor: '#F9EAE1',
    p: 4,
    outline: 'none'
};

interface ModalGeneric {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    children: ReactNode;
    title:string;
}
const ModalGeneric: React.FC<ModalGeneric> = ({ open, handleClose, handleOpen, children,title }) => {

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container alignItems='center' justifyContent='space-between'>
                        <p style={{
                            color: '#07142B',
                            fontFamily: 'Crimson Text',
                            fontSize: '25px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                        }}>{title}</p>
                        <CloseIcon sx={{fontSize: '35px',cursor:'pointer',color:'#07142B'}}
                            onClick={handleClose}
                        />
                    </Grid>
                    <Grid sx={{marginTop:'87px'}}>
                        {children}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default ModalGeneric;