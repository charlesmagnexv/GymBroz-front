import { useEffect, useState, } from 'react';
import { useBackdrop } from '../../../hooks/backdrop';
import { useFeedback } from '../../../hooks/addFeedback';
import {
    Badge,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
} from '@mui/material';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { getEventsTypes } from '../../../services/events.service';
import { EventTypeDTO } from '../../../models/Events';
import theme from '../../../theme';

interface FilterModalProps {
    open: boolean;
    handleClose: () => void;
    refreshEventsByType: (id: number) => void;
    handleRefreshEvents: () => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FilterModal = ({ open, handleClose, refreshEventsByType, handleRefreshEvents }: FilterModalProps) => {
    const [eventsTypes, setEventsTypes] = useState<EventTypeDTO>({} as EventTypeDTO)
    const [loading, setLoading] = useState<Boolean>(true)
    const [typesSelected, setTypesSelected] = useState<number>(0)

    const { addFedback } = useFeedback()

    useEffect(() => {
        setLoading(true)
        getEventsTypes().then(res => {
            setEventsTypes(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            addFedback({
                description: 'Erro ao exibir as categorias',
                typeMessage: 'error'
            })
        })
    }, [])

    const changeFilterList = (id: number) => {
        if (typesSelected !== id) {
            setTypesSelected(id)
        } else {
            setTypesSelected(0)
        }
    }

    const filterEvents = () => {
        if (typesSelected !== 0) {
            refreshEventsByType(typesSelected)
        } else {
            handleRefreshEvents()
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Filtre os eventos aqui!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {loading ?
                        (
                            <CircularProgress />
                        ) :
                        (eventsTypes.eventTypes ? eventsTypes.eventTypes.map((types, index) => {
                            return (
                                <Badge
                                    key={types.id}
                                    sx={
                                        {
                                            backgroundColor: typesSelected === types.id ? '#67e8f9' : '#d4d4d4',
                                            borderRadius: '5%',
                                            margin: 1,
                                            padding: 1,
                                            color: '#f5f5f4',
                                            cursor: 'pointer'
                                        }
                                    }
                                    onClick={() => {
                                        changeFilterList(types.id)
                                    }}
                                >
                                    {types.title}
                                </Badge>
                            )
                        }) : null)
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' sx={{ borderColor: '#4ade80', color: '#4ade80' }} onClick={handleClose}>Cancelar</Button>
                <Button sx={{ backgroundColor: '#4ade80', color: 'white', "&:hover": { backgroundColor: '#4ade80' } }} onClick={filterEvents}>Filtrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FilterModal;
