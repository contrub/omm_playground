// React components
import React from "react";
import {Link} from "react-router-dom";

// Material-UI components
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

// Material-UI icons
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  titleLink: {
    color: 'white',
    '&:hover': {
      color: '#A9A9A9',
      textDecoration: 'none'
    },
  },
  email: {
    color: '#B0C4DE',
    margin: theme.spacing(1)
  }
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
          <ListItem component={Link} to="/" className={classes.titleLink}>
            Open Monument Map
          </ListItem>
        </Typography>
        {props.email !== undefined && <Typography className={classes.email}>({props.email})</Typography>}
        {props.isLogged && <Button color="inherit" onClick={logout}>Logout</Button>}
        {!props.isLogged && <Button color="inherit" onClick={() => window.location.href = '/login'}>Login</Button>}
      </Toolbar>
    </AppBar>
  )
};

export default Header;
