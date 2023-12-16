import { 
    Alert, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Slide, 
    Typography 
} from "@mui/material";
import { useStyles } from "./styles";


interface DialogUnfriendProps {
    open: boolean;
    handleClose: () => void;
}

const DialogUnfriend: React.FC<DialogUnfriendProps> = ({ open, handleClose }) => {
    const classes = useStyles();

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
                sx={{ zIndex: "2000", }}
            >
                <DialogTitle id="alert-dialog-title">
                {"Remover Usuário da Lista de Amigos"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <Typography variant='h5' className={classes.textDialog}>
                        Deseja realmente Desfazer Amizade com o usuário ###
                    </Typography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    className={classes.btnDialogCancel}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => {
                        handleClose()
                    }}
                    className={classes.btnDialogLeave}
                >
                    Remover
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogUnfriend;