import React, { useState } from "react";
import {
    TextField,
    Box,
    Grid
} from '@mui/material';
//import { useStyles } from './styles';
import { useUserAuth } from "../../hooks/userProvider";


const UserEventRecord: React.FC = () => {

    const { user } = useUserAuth();
    //const classes = useStyles();

    return (
        <>
            <Box style={{padding: 20}} sx={{ boxShadow: 2, borderRadius: 2 }}>
                
            </Box>
        </>
    )
}

export default UserEventRecord

