import { Box, Grid } from '@mui/material';
import './style.css'
import ModalCreateEvent from '../../components/ModalCreateEvent';
import EventsList from '../../components/EventsList';

const Events = () => {
    return (
        <div className='div-style'>
            <Box className='box-father-style'>
                <Grid className='box-style' style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <ModalCreateEvent />
                </Grid>
                <Box className='box-style'>
                    <EventsList />
                </Box>
            </Box>
        </div>
    )
}

export default Events;