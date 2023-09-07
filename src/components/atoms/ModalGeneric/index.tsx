import { Box, Grid, Modal } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '580px',
    height: '620px',
    bgcolor: 'white',
    p: 4,
    outline: 'none',
    overflowY: 'scroll'
};

interface ModalStyle {
    style: {
        position: string;
        top: string;
        left: string;
        transform: string;
        width: string;
        height: string;
        bgcolor: string;
        p: number;
        outline: string;
    }

}

interface ModalGeneric {
    open: boolean;
    handleClose: () => void;
    handleOpen?: () => void;
    children: ReactNode;
    title: string;
    customStyle?: ModalStyle;
    customMargin?: string;
}
const ModalGeneric: React.FC<ModalGeneric> = ({ open, handleClose, handleOpen, children, title, customStyle, customMargin }) => {

    return (
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={customStyle ? customStyle.style : style}>
                    <Grid container alignItems='center' justifyContent='space-between'>
                        <p style={{
                            color: '#07142B',
                            fontFamily: 'Montserrat',
                            fontSize: '25px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                        }}>{title}</p>
                        <CloseIcon sx={{ fontSize: '35px', cursor: 'pointer', color: '#07142B' }}
                            onClick={handleClose}
                        />
                    </Grid>
                    <Grid sx={customMargin ? { marginTop: customMargin } : { marginTop: '87px' }}>
                        {children}
                    </Grid>
                </Box>
            </Modal>
    );
}

export default ModalGeneric;