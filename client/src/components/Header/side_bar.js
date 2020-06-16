import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import ContactSupport from '@material-ui/icons/ContactSupport';
import ListIcon from '@material-ui/icons/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Side_bar extends Component {
  render() {
    return (
      <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
        <div className="sidebar-navigation">
          <Link to="/">
            <ListItem button>
              <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
              <ListItemText primary={'Home'}/>
            </ListItem>
          </Link>

          <Link to="/about">
            <ListItem button>
              <ListItemIcon>{<ContactSupport/>}</ListItemIcon>
              <ListItemText primary={'About'}/>
            </ListItem>
          </Link>

          <Link to="/monuments">
            <ListItem button>
              <ListItemIcon>{<ListIcon/>}</ListItemIcon>
              <ListItemText primary={'Monuments'}/>
            </ListItem>
          </Link>
        </div>
      </Drawer>
    );
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
        console.log(this.props)
        const id = '123'
        const Link_to_monument = '/monument/' + id
      return (
        <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
            <div className="sidebar-navigation">
                <Link to='/home' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                  <ListItemText primary={'Home'} />
                  </ListItem>
                </Link>
                <Link to={Link_to_monument} onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<ContactSupportIcon/>}</ListItemIcon>
                  <ListItemText primary={'About'} />
                  </ListItem>
                </Link>
                <Link to='/monument/123' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                  <ListItemText primary={'Login'} />
                  </ListItem>
                </Link>
                <Link to='/monument/321' onClick={this.props.onLinkClick}>
                  <ListItem button>
                  <ListItemIcon>{<AccountBalanceIcon/>}</ListItemIcon>
                  <ListItemText primary={'Monument'} />
                  </ListItem>
                </Link>
            </div>
        </Drawer>
      );
    }
  }
}
  
export default Side_bar;
export default withStyles(styles)(Sidebar);
