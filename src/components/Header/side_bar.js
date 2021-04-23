// React components
import React, {Component} from 'react';
import {Link} from "react-router-dom";

// Material-UI components
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core";
import List from "@material-ui/core/List";

// Material-UI icons
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";

// Custom styles
import styles from '../../styles/js/side_bar';

class Sidebar extends Component {

  checkRole = (role) => {
    return this.props.userRole === role
  }

  render() {
    const { classes } = this.props

    return (
        <Drawer anchor={"left"} open={this.props.isDrawerOpen} onClose={this.props.closeDrawer}>
          <div className="sidebar-navigation">
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              // subheader={
              //   <ListSubheader component="div" id="nested-list-subheader">
              //     UserRole: {this.props.userRole}
              //   </ListSubheader>
              // }
              className={classes.root}
            >
              <ListItem button component={Link} to="/" onClick={this.props.closeDrawer}>
                <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              {this.checkRole('admin') && <ListItem button onClick={this.props.handleListClick}>
                <ListItemIcon>
                  <WebAssetIcon/>
                </ListItemIcon>
                <ListItemText primary="Administration"/>
                {this.props.isListOpen ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>}
              {this.checkRole('superadmin') && <ListItem button onClick={this.props.handleListClick}>
                <ListItemIcon>
                  <WebAssetIcon/>
                </ListItemIcon>
                <ListItemText primary="Administration"/>
                {this.props.isListOpen ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>}
              {this.checkRole('admin') &&
                <Collapse in={this.props.isListOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      onClick={this.props.closeDrawer}
                      className={classes.nested}
                      component={Link}
                      to="/monuments_sheet"
                    >
                      <ListItemIcon>
                        <AccountBalanceIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Monuments"/>
                    </ListItem>
                  </List>
                </Collapse>
              }
              {this.checkRole('superadmin') &&
                <Collapse in={this.props.isListOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={Link} to="/monuments_sheet"
                              onClick={this.props.closeDrawer}>
                      <ListItemIcon>
                        <AccountBalanceIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Monuments"/>
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={Link} to="/users_sheet"
                              onClick={this.props.closeDrawer}>
                      <ListItemIcon>
                        <SupervisorAccountIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Users"/>
                    </ListItem>
                  </List>
              </Collapse>
              }
              <ListItem button component={Link} to="/about" onClick={this.props.closeDrawer}>
                <ListItemIcon>{<ContactSupportIcon/>}</ListItemIcon>
                <ListItemText primary={'About'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      );
    }
}

export default withStyles(styles)(Sidebar);
