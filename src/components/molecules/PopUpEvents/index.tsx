import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import {
  deleteEvent,
  joinEvent,
} from "../../../services/events.service";
import { useBackdrop } from "../../../hooks/backdrop";
import moment from "moment";
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import { useFeedback } from "../../../hooks/addFeedback";
import DialogLaveEvent from "../../DialogLeaveEvent";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EventDeatails from "../EventDetails";

export interface PopUpEventsDTO {
  title: string;
  date: string;
  id: number;
  deleteEventInPop?: () => void;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
  profilePicturePath: string | null;
  isAdmin: boolean;
  isActive: boolean;
  isEmailConfirmed: boolean;
}

export interface Address {
  road: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpEvents: React.FC<PopUpEventsDTO> = ({
  title,
  date,
  id,
  deleteEventInPop,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [idEvent, setIdEvent] = useState<number>(1);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const { handleBackdrop } = useBackdrop();
  const { addFedback } = useFeedback();

  moment.locale('pt', {
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const handleOpenLeaveDialog = () => {
    setOpenLeaveDialog(true);
  };

  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
  };

  const deleteEventById = (eventId: number) => {
    handleBackdrop(true);
    deleteEvent(eventId)
      .then((res) => {
        addFedback({
          description: `${res.data.message}`,
          typeMessage: "success",
        });
        deleteEventInPop && deleteEventInPop();
      })
      .catch((err) => {
        addFedback({
          description: `${err.data.message}`,
          typeMessage: "error",
        });
        handleBackdrop(false);
      });
  };

  const handleJoinEvent = (eventId: number) => {
    handleBackdrop(true);
    joinEvent(eventId)
      .then((res) => {
        handleBackdrop(false);
        handleClose();
        addFedback({
          description: `${res.data.message}!`,
          typeMessage: "success",
        });
      })
      .catch((err) => {
        handleBackdrop(false);
        handleClose();
        addFedback({
          description: `${err.data.message}!`,
          typeMessage: "error",
        });
      });
  };

  return (
    <>
      <Box className={classes.popup}>
        <Typography
          variant="h6"
          className={classes.titlePopup}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          className={classes.textPopup}
        >
          {moment(date).format(`DD [de] MMMM [de] YYYY [, ] HH:mm`)}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Tooltip
            title="Detalhes"
            placement="top"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
          >
            <IconButton
              onClick={() => {
                handleOpen();
              }}
              aria-label="edit"
              size="large"
              className={classes.btnEdit}
            >
              <MoreHorizIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <EventDeatails open={open} handleClose={handleClose} handleOpen={handleOpen} id={id} />

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: "2000" }}
      >
        <DialogTitle>Deseja excluir o evento?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="warning">
              Excluir o evento é uma ação irreversível, tenha certeza ao
              executar!
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickClose}
            variant="outlined"
            className={classes.btnDialogCancel}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClickClose();
              idEvent && deleteEventById(idEvent);
            }}
            className={classes.btnDialogDelete}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <DialogLaveEvent
        eventId={idEvent}
        open={openLeaveDialog}
        handleClose={handleCloseLeaveDialog}
        closeModalEvent={handleClose}
      />
    </>
  );
};

export default PopUpEvents;
