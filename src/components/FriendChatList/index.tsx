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
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useStyles } from './styles';
import { useUserAuth } from "../../hooks/userProvider";
import { useHistory } from 'react-router';
import DialogUnfriend from "../molecules/DialogUnfriend";
import DialogBlockFriend from "../molecules/DialogBlockFriend";
import theme from "../../theme";
  

const FriendChatList: React.FC = () => {
    const [openUnfriendDialog, setOpenUnfriendDialog] = useState(false);
    const [openBlockFriendDialog, setOpenBlockFriendDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const PerfilPagePath = '/perfil';

    const showFriendMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const CloseFriendMenu = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    const handleOpenUnfriendDialog = () => {
        setOpenUnfriendDialog(true);
    };

    const handleCloseUnfriendDialog = () => {
        setOpenUnfriendDialog(false);
    };

    const handleOpenBlockFriendDialog = () => {
        setOpenBlockFriendDialog(true);
    };

    const handleCloseBlockFriendDialog = () => {
        setOpenBlockFriendDialog(false);
    };

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    paddingTop: 3,
                    overflow: 'auto',
                    maxHeight: 651,
                    '& ul': { padding: 0 },
                }}
                >
                {[0].map((sectionId) => (
                    <li key={`section-${sectionId}`}>
                    <ul>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`} alignItems="flex-start" 
                            secondaryAction={
                                <Stack direction={"row"} spacing={2}>
                                    <Tooltip
                                        title="Mostrar Opções"
                                        placement="top"
                                        arrow
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 400 }}
                                    >
                                        <IconButton 
                                            edge="end" 
                                            aria-label="showMenu"
                                            id="long-button"
                                            aria-controls={open ? 'friend-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={showFriendMenu}
                                            
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="friend-menu"
                                        MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={CloseFriendMenu}
                                        PaperProps={{
                                        style: {
                                            width: '23ch',
                                        },
                                        }}
                                    >
                                        <MenuItem 
                                            onClick={handleOpenBlockFriendDialog}
                                        >
                                        <Stack direction="row" spacing={1}>
                                            <PersonOffIcon />
                                            <Typography>Bloquear Conta</Typography>
                                        </Stack>
                                        </MenuItem>
                                        <MenuItem 
                                            onClick={handleOpenUnfriendDialog}
                                        >
                                        <Stack direction="row" spacing={1}>
                                            <GroupRemoveIcon />
                                            <Typography>Remover Conta</Typography>
                                        </Stack>
                                        </MenuItem>
                                        <MenuItem 
                                            
                                        >
                                        <Stack direction="row" spacing={1}>
                                            <ContactPageIcon />
                                            <Typography>Mais Info</Typography>
                                        </Stack>
                                        </MenuItem>
                                    </Menu>
                                </Stack>
                            }
                            sx={{border:'1px solid black', paddingBottom: 2}}
                        >
                            <ListItemAvatar>
                            <Avatar sx={{ 
                                width: 50, 
                                height: 50 
                            }}>
                                
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            style={{paddingTop: 5, paddingLeft: 5}}
                            primary={`Amigo ${item}`}
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Status
                                  </Typography>
                                  {" — Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        ))}
                    </ul>
                    </li>
                ))}
            </List>
            <DialogUnfriend open={openUnfriendDialog} handleClose={handleCloseUnfriendDialog} />
            <DialogBlockFriend open={openBlockFriendDialog} handleClose={handleCloseBlockFriendDialog} />
        </>
    )
}

export default FriendChatList
