import {
  Box,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import moment from "moment";
import { useStyles } from "./styles";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EventDeatails from "../EventDetails";

export interface PopUpEventsDTO {
  title: string;
  date: string;
  id: number;
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

interface CloseDetailsDTO {
  closeDetails: () => void;
}

const CloseDetailsContext = createContext<CloseDetailsDTO>({} as CloseDetailsDTO)

export const useCloseDetails = (): CloseDetailsDTO => useContext(CloseDetailsContext)

export const CloseDetailsProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
  };
  return (
    <CloseDetailsContext.Provider value={{ closeDetails: handleClose }}>
      {children}
    </CloseDetailsContext.Provider>
  )
}

const PopUpEvents: React.FC<PopUpEventsDTO> = ({
  title,
  date,
  id,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [idEvent, setIdEvent] = useState<number>(1);

  moment.locale('pt', {
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  });

  const handleOpen = () => {
    setIdEvent(id)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <>
      <CloseDetailsContext.Provider value={{ closeDetails: handleClose }}>
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
        {open ? <EventDeatails open={open} handleClose={handleClose} id={idEvent} /> : null}
      </CloseDetailsContext.Provider>
    </>
  );
};

export default PopUpEvents;
