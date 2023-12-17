import { Box, Grid } from '@mui/material';
import './style.css'
import ModalCreateEvent from '../../components/ModalCreateEvent';
import EventsList from '../../components/template/EventsList';
import { EventsDTO } from '../../services/events.service';
import { useState } from 'react';

const Events = () => {
    const [userEvents, setUserEvents] = useState<EventsDTO>({ events: [] })

    const addedNewEvent = (newEvent: any) => {
        setUserEvents(prevState => {
            return { ...prevState, events: [newEvent, ...userEvents.events] }
        })
    }

    console.log(userEvents)

    return (
        <div className='div-style'>
            <Box className='box-father-style'>
                <Grid className='box-style' style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <ModalCreateEvent addNewEvent={addedNewEvent} />
                </Grid>
                <Box className='box-style'>
                    <EventsList userEvents={userEvents} setUserEvents={setUserEvents} />
                </Box>
            </Box>
        </div>
    )
}

export default Events;