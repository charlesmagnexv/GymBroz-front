import './style.css'
import MapEvents from '../../components/organisms/MapEvents/MapEvents';
import "leaflet/dist/leaflet.css";
import { useUserAuth } from '../../hooks/userProvider';
import { Grid, styled, useTheme } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useState } from 'react';

const Dash = () => {
    const { user } = useUserAuth()

    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ position: 'relative', height: '100% !important' }}>
                    <MapEvents />
                </Grid>
            </Grid>
        </>
    );
}

export default Dash;
