import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from "../styles/js/header";

class Header extends React.Component {
  state = {
    input: ''
  };

  onChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.parentMethod(this.state)
    }
  }
  render() {
    const {classes, name} = this.props
    return (
     <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}> {name}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.onChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Header)
