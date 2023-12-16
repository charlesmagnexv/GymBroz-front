import { 
    Box, 
    Grid, 
    TextField 
} from '@mui/material';
import './style.css';

const Friends = () => {
    return (
        <div style={{backgroundColor: '#ffff'}}>
            <Box>
                <p>Amigos</p>
                <Grid container gap={0.5}>
                    <Grid item md={4.5} style={{padding: 8, backgroundColor: '#ffff'}}>
                        Lista de Amigos
                    </Grid>
                    <Grid item md={7.45} style={{padding: 8, backgroundColor: '#ffff'}}>
                        Chat
                    </Grid>
                </Grid>
            </Box>
        </div>
        )
}

export default Friends;