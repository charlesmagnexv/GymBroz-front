import * as React from 'react';
import { Box, Grid, SvgIconProps, Avatar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from 'react';
import { useStyles } from './styles';
import { useHistory } from 'react-router';
import { logout } from '../../../services/auth.service';
import { useUserAuth } from '../../../hooks/userProvider';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface ItensMenu {
  name: string;
  icon: React.ReactElement<SvgIconProps>,
  path: string;
}

const NavBarUserAuth: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let itensMenu: ItensMenu[] = [
    {
      name: 'Home',
      icon: <HomeIcon />,
      path: '/dash',
    },
    {
      name: 'Eventos',
      icon: <ListIcon />,
      path: '/events',
    },
    {
      name: 'Amigos',
      icon: <GroupIcon />,
      path: '',
    },
    {
      name: 'Perfil',
      icon: <PersonIcon />,
      path: 'perfil',
    },
    {
      name: 'Configurações',
      icon: <SettingsIcon />,
      path: '',
    },
  ]

  const { user } = useUserAuth();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

      let perfilImage = "";

      if (user.profilePictureUrl == undefined) {
          perfilImage = "https://s.glbimg.com/po/tt/f/original/2013/09/18/facebookperfil.jpg";
      } else {
          perfilImage = user.profilePictureUrl;
      }

  return (
    <div>
      <React.Fragment>
        <Grid 
          container
          alignItems='center'
          direction={'row'}
          gap={1}
          sx={{
            borderBottom: '2.5px solid #07142B',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            height: '70px',
            backgroundColor: '#07142B'
          }}>
            <Grid item>
              <MenuIcon onClick={toggleDrawer('left', true)} sx={{ marginLeft: '30px', fontSize: '35px',color: 'rgba(255, 255, 255, 0.90)' }} />
            </Grid>
            <Grid item>
              <p className={classes.titleHeader} style={{paddingLeft: 30}} onClick={()=>history.push(itensMenu[0].path)}>GymBroz</p> 
            </Grid>
            <Grid item xs={6}>

            </Grid>
            {/* <Grid item>
              <p className={classes.headerWelcome}>Olá!</p>
            </Grid>
            <Grid item>
              <p className={classes.headerWelcomeMessage}>Seja bem vindo ao GymBroz</p>
            </Grid>
            <Grid item>
              <p className={classes.headerUserName}>{user.firstName} {user.lastName}</p>
            </Grid>
            <Grid item style={{paddingLeft: 18}}>
              <Avatar 
                alt="Avatar de Perfil" 
                src={perfilImage} 
                sx={{ 
                  width: 50, 
                  height: 50 
                }}>
                
              </Avatar>
            </Grid> */}
        </Grid>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: 'white',
            },
          }}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <List>
              {itensMenu && itensMenu.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => { history.push(item.path) }}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                logout()
                history.push('/')
              }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Sair'} />
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NavBarUserAuth;