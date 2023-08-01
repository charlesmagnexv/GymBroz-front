import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useStyles } from './styles';
import { Button } from '@mui/material';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Navbar: React.FC = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles()

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

  return (
    <div>
      <React.Fragment>
        <Grid container alignItems='center' gap={2} sx={{
          borderBottom: '2.5px solid #07142B',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          height: '70px'
        }}>
          <MenuIcon onClick={toggleDrawer('left', true)} sx={{ marginLeft: '30px', fontSize: '35px' }} />
          <p style={{
            color: '#07142B',
            fontFamily: 'Montserrat',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}>GymBroz</p>
        </Grid>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#F9EAE1',
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
              {['Quem Somos',].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LightbulbIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Navbar;