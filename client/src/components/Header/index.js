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

const removeSessionData = async () => {
  sessionStorage.removeItem('refreshToken')
  let cookies = document.cookie;
  let cookiesArray = cookies.split(';')
  for (let i = 0; i < cookiesArray.length; i++) {
    let name = cookiesArray[i].split('=')[0];
    let value = cookiesArray[i].split('=')[1];
    if (name.includes('accessToken')) {
      document.cookie = `accessToken=${value}; expires = Thu, 01 Jan 1970 00:00:00 GMT`
      break
    }
  }
  document.cookie = "accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

const logout = () => {
  removeSessionData()
    .then(() => {
      window.location.href = '/login'
    })
}

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
          <Button color="inherit" onClick={logout}>Logout</Button>
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
