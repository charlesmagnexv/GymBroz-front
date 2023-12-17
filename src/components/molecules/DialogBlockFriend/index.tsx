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

const DialogBlockFriend: React.FC<DialogUnfriendProps> = ({ open, handleClose }) => {
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
                {"Bloquear Usuário da sua Lista de Amigos"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <Typography variant='h5' className={classes.textDialog}>
                        Deseja realmente Bloquear a conta deste usuário?
                    </Typography>
                    <Typography className={classes.textSubDialog}>
                        Você não receberá mais notificações ou mensagens em relação à ela
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
                    className={classes.btnDialogBlock}
                >
                    Bloquear
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogBlockFriend;