import React from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

import Cookies from "js-cookie";

// import Search from './search';

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

const logout = () => {
  window.location.href = '/logout'
}

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} onClick={props.openDrawer} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Open Monument Map
        </Typography>
        {/*<Search submitSearch={props.submitSearch}/>*/}
        {props.isLogged && <Button color="inherit" onClick={logout}>Logout</Button>}
        {!props.isLogged && <Button color="inherit" href='/login'>Login</Button>}
      </Toolbar>
    </AppBar>
  )
};

export default Header;
