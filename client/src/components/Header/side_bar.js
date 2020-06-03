import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const styles = {
    search: {

    }
}
class Side_bar extends Component {
    render() {
        const { classes } = this.props;
        console.log(this.props)
      return (
        <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
            <div className="sidebar-navigation">
                <ListItem button>
                <ListItemIcon>{<MailIcon/>}</ListItemIcon>
                <ListItemText primary={'Home'} />
                </ListItem>
            </div>
        </Drawer>
      );
    }
  }
  
export default withStyles(styles)(Side_bar);
  