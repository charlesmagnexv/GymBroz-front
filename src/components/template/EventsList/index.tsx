import { useCallback, useEffect, useState, forwardRef, } from "react";
import { EventUnique, EventsDTO, deleteEvent, getEventsByUser } from "../../../services/events.service";
import {
    Alert,
    Box,
    Card,
    CardActions,
    CardContent,
    Fade,
    Grid,
    IconButton,
    Pagination,
    Slide,
    Tooltip,
    Typography,
    CardActionArea
} from "@mui/material";
import { useStyles } from "./styles";
import moment from "moment";
import { useBackdrop } from '../../../hooks/backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TransitionProps } from '@mui/material/transitions';
import CustomSkeleton from "../../organisms/Skeleton";
import { useFeedback } from "../../../hooks/addFeedback";
import LogoutIcon from '@mui/icons-material/Logout';
import theme from "../../../theme";
import DialogDeleteEvent from "./EventDetails/DialogDelete";
import { RefreshEventsContext } from "../../organisms/MapEvents/MapEvents";
import EventDeatails from "./EventDetails/EventDetails";
import DialogLeaveEvent from "./EventDetails/DialogLeaveEvent";

export interface RefreshDTO {
    getEvents: () => void
}

interface RefreshListDTO {
    getEvents: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventsList: React.FC<{ userEvents: EventsDTO, setUserEvents: React.Dispatch<React.SetStateAction<EventsDTO>> }> = ({ userEvents, setUserEvents }) => {
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6)
    const [loadingCard, setLoadingCard] = useState(false);
    const [idEvent, setIdEvent] = useState<number>(1)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openLeave, setOpenLeave] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [openEventDetails, setOpenEventDetails] = useState(false);

    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleOpenLeaveDialog = () => {
        setOpenLeave(true);
    };

    const handleCloseLeaveDialog = () => {
        setOpenLeave(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }

    const handleOpenEventDetails = () => {
        setOpenEventDetails(true)
    }

    const handleCloseEventDetails = () => {
        setOpenEventDetails(false)
    }

    const getEvents = useCallback(() => {
        handleBackdrop(true)
        setLoadingCard(true);
        getEventsByUser().
            then(res => {
                handleBackdrop(false)
                setUserEvents(prevState => {
                    return { ...prevState, events: res.data.events }
                })
            })
            .catch(err => {
                addFedback({
                    description: 'Erro ao exibir os eventos!',
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
            .finally(() => {
                setLoadingCard(false);
            })
    }, [])

    useEffect(() => {
        getEvents()
    }, [])


    const deleteEventById = (eventId: number) => {
        handleBackdrop(true)
        deleteEvent(eventId)
            .then(res => {
                getEvents()
                addFedback({
                    description: 'Evento excluído com sucesso!',
                    typeMessage: 'success'
                })
            })
            .catch(err => {
                handleBackdrop(false)
                addFedback({
                    description: 'Erro ao excluir o evento!',
                    typeMessage: 'success'
                })
            })
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = userEvents?.events.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = userEvents && Math.ceil(userEvents?.events.length / postPerPage);

    return (
        <RefreshEventsContext.Provider value={{ handleRefreshEvents: getEvents }}>
            <Grid container sx={{ minHeight: '60vh' }}>
                {loadingCard ?
                    <CustomSkeleton />
                    : (
                        <>
                            {currentPost && (currentPost.length > 0 ? currentPost.map((event: any) =>
                            (
                                <Grid item lg={4} md={6} sm={12} xs={12} p={1} key={event.id}>
                                    <Card sx={{ minWidth: 275, }}
                                        className={
                                            classes.card}
                                    >
                                        <CardActionArea
                                            onClick={() => {
                                                handleOpenEventDetails()
                                                setIdEvent(event.id)
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ color: theme.palette.primary.main }}
                                                >
                                                    {event.title}
                                                </Typography>
                                                {event.isAdmin ?
                                                    <Box mb={2}>
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                color: theme.palette.secondary.light,
                                                            }}
                                                        >
                                                            Proprietário
                                                        </Typography>
                                                    </Box>
                                                    :
                                                    <Box mb={2}>
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                color: theme.palette.info.main,
                                                            }}
                                                        >
                                                            Participante
                                                        </Typography>
                                                    </Box>
                                                }

                                                <Typography variant="body1">
                                                    {moment(event.eventDate).format(`DD [de] MMMM [de] YYYY [, ] HH:mm`)}
                                                </Typography>
                                                <Typography variant="body1" mt={1} mb={1}>
                                                    {event.address}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {event.description.length > 39
                                                        ? `${event.description.slice(0, 40)} ...`
                                                        : `${event.description.slice(0, 40)}`}
                                                </Typography>

                                            </CardContent>
                                            {event.isAdmin ?
                                                (<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                                            onMouseDown={e => e.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // e.preventDefault();
                                                                setIdEvent(event.id)
                                                                handleOpenDelete()
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
                                                            onMouseDown={event => event.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                handleOpenEdit()
                                                            }}
                                                        >
                                                            <EditIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Tooltip>

                                                </CardActions>)
                                                : (<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Tooltip
                                                        title="Sair do Evento"
                                                        placement="top"
                                                        arrow
                                                        TransitionComponent={Fade}
                                                        TransitionProps={{ timeout: 400 }}
                                                    >
                                                        <IconButton
                                                            aria-label="exit"
                                                            size="large"
                                                            onMouseDown={e => e.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                setIdEvent(event.id);
                                                                handleOpenLeaveDialog();
                                                            
                                                            }}
                                                            className={classes.btnDelete}
                                                        >
                                                            <LogoutIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </CardActions>)
                                            }
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                                : (
                                    <Alert severity="error" sx={{ width: '80vw', height: '50px' }}>Não há eventos associados a esta conta!</Alert>
                                ))}

                            {currentPost && currentPost.length > 0 ? (totalPages && totalPages > 1 && (
                                <Grid xs={12} sm={12} item
                                    className={classes.pagination}
                                >
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            )) : null}
                        </>
                    )}

            </Grid>
            <DialogDeleteEvent open={openDelete} handleClose={handleCloseDelete} idEvent={idEvent} />
            <DialogLeaveEvent open={openLeave} handleClose={handleCloseLeaveDialog} idEvent={idEvent} />
            {openEventDetails ? <EventDeatails open={openEventDetails} handleClose={handleCloseEventDetails} id={idEvent} /> : null}
        </RefreshEventsContext.Provider>
    )
}

export default EventsList;