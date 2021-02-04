import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Search from './search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  title: {
    flexGrow: 1,
  },
}));

// const removeCookies = () => {
//
//   document.cookie = 'accessToken' +'="";-1; path=/';
//   document.cookie = 'refreshToken' +'="";-1; path=/';
//   window.href = '/login'
// }

const Header = (props) => {
  const classes = useStyles();

  if (props.status) {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={props.openDrawer} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Open Monument Map
          </Typography>
          <Search submitSearch={props.submitSearch}/>
          <Button color="inherit" href='/login'>Logout</Button>
        </Toolbar>
      </AppBar>
    )
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={props.openDrawer} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Open Monument Map
          </Typography>
          <Search submitSearch={props.submitSearch}/>
          <Button color="inherit" href='/login'>Login</Button>
        </Toolbar>
      </AppBar>
    )
  }
};

export default Header;
