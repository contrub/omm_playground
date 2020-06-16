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
  }
}
  
export default Side_bar;
