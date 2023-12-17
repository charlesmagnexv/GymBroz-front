import { 
    Box, 
    Grid, 
    TextField 
} from '@mui/material';
import useStyles from './style';
import FriendChatList from '../../components/FriendChatList';

const Friends = () => {

    const classes = useStyles();
    
    return (
        <div style={{padding: 8, backgroundColor: '#ffff'}}>
            <Box>
                <Grid container gap={0.5}>
                    <Grid item md={4.5} sx={{backgroundColor: '#ffff'}}>
                        <FriendChatList />
                    </Grid>
                    <Grid item md={7.45} sx={{border:'1px solid black', borderWidth: 2, padding: 3, backgroundColor: '#f0ece5'}}>
                        Chat
                    </Grid>
                </Grid>
            </Box>
        </div>
        )
}

export default Friends;