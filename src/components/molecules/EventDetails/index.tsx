import { Box, Fade, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import { EventByIdDTO } from "../../../models/Events";
import FeedIcon from "@mui/icons-material/Feed";
import LogoutIcon from "@mui/icons-material/Logout";
import InputIcon from "@mui/icons-material/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import ModalGeneric from "../../atoms/ModalGeneric";
import moment from "moment";
import { useEffect, useState } from "react";
import { useBackdrop } from "../../../hooks/backdrop";
import axios from "axios";
import EventParticipants from "../../EventParticipants";
import { useStyles } from "./styles";
import { getEventsById, joinEvent } from "../../../services/events.service";
import { useFeedback } from "../../../hooks/addFeedback";

interface EventDeatailsProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    id: number;
}

interface Address {
    road: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

const EventDeatails: React.FC<EventDeatailsProps> = ({ open, handleClose, handleOpen, id }) => {
    const [address, setAddress] = useState<string>();
    const [idEvent, setIdEvent] = useState<number>(1);
    const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingCard, setLoadingCard] = useState(true);
    const [eventById, setEventById] = useState<EventByIdDTO>();

    const classes = useStyles();
    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback();

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

    async function reverseGeocode(
        latitude: number,
        longitude: number
    ): Promise<string> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await axios.get(url);
            const address: Address = response.data.address;
            return `${address.road}, ${address.suburb}, ${address.city} - ${address.state} , ${address.country}`;
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    useEffect(() => {
        handleBackdrop(true);
        setLoadingCard(true);

        getEventsById(id)
            .then((res) => {
                setEventById(res?.data!);
                handleBackdrop(false);
            })
            .catch((err) => {
                addFedback({
                    description: `Erro ao carregar os detalhes do evento`,
                    typeMessage: "error",
                });
                handleBackdrop(false);
            })
            .finally(() => {
                setLoadingCard(false)
            });
    }, [id])

    useEffect(() => {
        if (eventById) {
            reverseGeocode(eventById.event.geocode[0], eventById.event.geocode[1])
                .then((res) => {
                    setAddress(res);
                    handleBackdrop(false);
                })
                .catch((err) => {
                    handleBackdrop(false);
                });
        }
    }, [eventById]);

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
            <ModalGeneric title="Detalhes" open={open} handleOpen={handleOpen} handleClose={handleClose} customMargin="27px">
                {loadingCard ? (
                    <>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="rectangular" width={210} height={200} />
                        <Skeleton variant="rounded" width={210} height={200} />
                    </>
                ) :
                    (
                        <>
                            <Typography variant="h4" sx={{ mb: 3 }} className={classes.titleEvent}>
                                {eventById?.event.title}
                            </Typography>
                            <Typography sx={{ mb: 3, }}>
                                {eventById?.event.isPublic ? (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                        <PublicIcon />
                                    </Box>
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                        <PublicOffIcon />
                                    </Box>
                                )}
                            </Typography>

                            <Typography sx={{ mb: 1 }} className={classes.textAddress}>Local: {address}</Typography>

                            <Typography sx={{ mb: 3 }} className={classes.textDate}>
                                {moment(eventById?.event.eventDate).format("DD [de] MMMM [de] YYYY")}{", "}
                                {moment(eventById?.event.eventDate).format("HH:mm")}
                            </Typography>

                            <Typography variant="body1" className={classes.textDescription}>
                                {eventById?.event.description}
                            </Typography>
                            {
                                <EventParticipants
                                    idEvent={id}
                                />
                            }
                            {eventById?.isAdmin ? (
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Tooltip
                                        title="Deletar"
                                        placement="top"
                                        arrow
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 400 }}
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            size="large"
                                            onClick={() => {
                                                handleClickOpen();
                                                setIdEvent(eventById.event.id);
                                            }}
                                            className={classes.btnDelete}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title="Editar"
                                        placement="top"
                                        arrow
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 400 }}
                                    >
                                        <IconButton
                                            aria-label="edit"
                                            size="large"
                                            className={classes.btnEdit}
                                        >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    {!eventById?.isParticipant ? (
                                        <>
                                            <Tooltip
                                                title="Entrar no evento"
                                                placement="top"
                                                arrow
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 400 }}
                                            >
                                                <IconButton
                                                    aria-label="join"
                                                    size="large"
                                                    className={classes.btnEdit}
                                                    onClick={() => {
                                                        eventById?.event.id &&
                                                            handleJoinEvent(eventById?.event.id);
                                                    }}
                                                >
                                                    <InputIcon fontSize="large" />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip
                                                title="Sair do evento"
                                                placement="top"
                                                arrow
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 400 }}
                                            >
                                                <IconButton
                                                    aria-label="leave"
                                                    size="large"
                                                    className={classes.btnDelete}
                                                    onClick={() => {
                                                        eventById?.event.id &&
                                                            setIdEvent(eventById?.event.id);
                                                        handleOpenLeaveDialog();
                                                    }}
                                                >
                                                    <LogoutIcon fontSize="large" />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </Box>
                            )}
                        </>
                    )}
            </ModalGeneric>
        </>
    );
}

export default EventDeatails;
