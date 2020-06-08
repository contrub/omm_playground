import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import CodeIcon from '@material-ui/icons/Code';
import TocIcon from '@material-ui/icons/Toc';
import {
  Link,
} from "react-router-dom";

const styles = {
    search: {

    }
}
class Sidebar extends Component {
    render() {
      return (
          <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
              <nav>
                <div className="sidebar-navigation">
                    <ListItem >
                      <Link to="/monument/information">
                        <ListItemIcon>{<TocIcon/>}</ListItemIcon>
                        Information
                      </Link>
                    </ListItem>
                    <ListItem >
                      <Link to="/monument/bugs_info">
                        <ListItemIcon>{<CodeIcon/>}</ListItemIcon>
                        Bugs info
                      </Link>
                    </ListItem>
                </div>
              </nav>
          </Drawer>
      );
    }
  }
export default withStyles(styles)(Sidebar);
  