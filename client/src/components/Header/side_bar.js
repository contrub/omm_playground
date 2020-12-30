import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {
  Link
} from "react-router-dom";
const styles = {
    search: {

    }
}
class Sidebar extends Component {
    render() {
        // const { classes } = this.props;
        // console.log(this.props)
      return (
        <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
            <div className="sidebar-navigation">
                <Link to='/home' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                  <ListItemText primary={'Home'} />
                  </ListItem>
                </Link>
                <Link to='/about' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<ContactSupportIcon/>}</ListItemIcon>
                  <ListItemText primary={'About'} />
                  </ListItem>
                </Link>
                {/*<Link to='/login' onClick={this.props.onLinkClick}>*/}
                {/*  <ListItem button>*/}
                {/*  <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>*/}
                {/*  <ListItemText primary={'Login'} />*/}
                {/*  </ListItem>*/}
                {/*</Link>*/}
                <Link to='/monuments' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<AccountBalanceIcon/>}</ListItemIcon>
                  <ListItemText primary={'Monuments'} />
                  </ListItem>
                </Link>
            </div>
        </Drawer>
      );
    }
  }
  
export default withStyles(styles)(Sidebar);
