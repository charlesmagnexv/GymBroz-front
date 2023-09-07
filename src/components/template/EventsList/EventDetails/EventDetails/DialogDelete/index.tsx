import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from "@mui/material";
import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import { useBackdrop } from "../../../../../../hooks/backdrop";
import { useFeedback } from "../../../../../../hooks/addFeedback";
import { useRefreshEvents } from "../../../../../organisms/MapEvents/MapEvents";
import { useCloseDetails } from "../../../../../molecules/PopUpEvents";
import { deleteEvent } from "../../../../../../services/events.service";

interface DialogDeleteEventProps {
    open: boolean;
    handleClose: () => void;
    idEvent: number;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogDeleteEvent: React.FC<DialogDeleteEventProps> = ({ open, handleClose, idEvent }) => {
    const classes = useStyles();

    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback();
    const { handleRefreshEvents } = useRefreshEvents();
    const { closeDetails } = useCloseDetails()

    const deleteEventById = (eventId: number) => {
        handleBackdrop(true);
        deleteEvent(eventId)
            .then((res) => {
                handleBackdrop(false);
                closeDetails()
                addFedback({
                    description: `${res.data.message}`,
                    typeMessage: "success",
                });
                handleRefreshEvents()
            })
            .catch((err) => {
                handleBackdrop(false);
                console.log(err)
                addFedback({
                    description: `${err.data.message}`,
                    typeMessage: "error",
                });
            });
    };
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ zIndex: "2000", }}
                className={classes.dialogCustom}
            >
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText>
                        <Typography variant='h5' className={classes.textDialog}>
                            Deseja excluir este evento?
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
                            handleClose();
                            idEvent && deleteEventById(idEvent);
                        }}
                        className={classes.btnDialogDelete}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogDeleteEvent;
