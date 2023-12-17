import React, { useState } from "react";
import {
    TextField,
    Box,
    Grid,
    Button,
    Stack,
    Avatar,
    Divider,
    Typography,
    Fade,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    IconButton,
    Tooltip,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import { useStyles } from './styles';
import { useUserAuth } from "../../hooks/userProvider";
import theme from "../../theme";
import DialogUnfriend from "../molecules/DialogUnfriend";


const UserFriendList: React.FC = () => {
    const [openUnfriendDialog, setOpenUnfriendDialog] = useState(false);
    const { user } = useUserAuth();
    const classes = useStyles();

    const handleOpenUnfriendDialog = () => {
        setOpenUnfriendDialog(true);
    };

    const handleCloseUnfriendDialog = () => {
        setOpenUnfriendDialog(false);
    };

    return (
        <>
            <Box style={{ padding: 20 }} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={35} alignItems={"center"} paddingBottom={3}>
                    <p className={classes.titleTextField} style={{ paddingBottom: 5 }}>Amigos</p>
                    <Button style={{ backgroundColor: '#09D17E' }} variant="contained" startIcon={<PersonAddAlt1Icon fontSize="medium" />}>
                        Adicionar Amigo
                    </Button>
                </Stack>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        paddingTop: 3,
                        overflow: 'auto',
                        maxHeight: 500,
                        border: 'none',
                        '& ul': { padding: 0 },
                    }}
                >
                    {[0].map((sectionId) => (
                        <li key={`section-${sectionId}`} style={{ border: 'none' }}>
                            <ul>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                    <ListItem key={`item-${sectionId}-${item}`} alignItems="flex-start"
                                        secondaryAction={
                                            <Stack direction={"row"} spacing={2}>
                                                <Tooltip
                                                    title="Começar Chat"
                                                    placement="top"
                                                    arrow
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 400 }}
                                                >
                                                    <IconButton edge="end" aria-label="chat">
                                                        <ChatIcon style={{ color: theme.palette.success.dark }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Desfazer Amizade"
                                                    placement="top"
                                                    arrow
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 400 }}
                                                >
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            handleOpenUnfriendDialog();
                                                        }}>
                                                        <DeleteIcon
                                                            style={{ color: theme.palette.error.main }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        }
                                        sx={{ border: '1px solid black', paddingBottom: 2 }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{
                                                width: 50,
                                                height: 50
                                            }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{ paddingTop: 20, paddingLeft: 5 }}
                                            primary={`${user.firstName} ${user.lastName} ${item}`}
                                        />
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </Box>
            <DialogUnfriend open={openUnfriendDialog} handleClose={handleCloseUnfriendDialog} />
        </>
    )
}

export default UserFriendList
