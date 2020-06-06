import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import CodeIcon from '@material-ui/icons/Code';
import TocIcon from '@material-ui/icons/Toc';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const styles = {
    search: {

    }
}
class Sidebar extends Component {
    render() {
        // const { classes } = this.props; (not used)
        // console.log(this.props)
      return (
        <Router>
          <Drawer anchor={"left"} open={this.props.isOpen} onClose={this.props.closeDrawer}>
              <nav>
                <div className="sidebar-navigation">
                    <ListItem >
                      <Link to="/info">
                        <ListItemIcon>{<TocIcon/>}</ListItemIcon>
                        Information
                      </Link>
                    </ListItem>
                    <ListItem >
                      <Link to="/bugs">
                        <ListItemIcon>{<CodeIcon/>}</ListItemIcon>
                        Bugs info
                      </Link>
                    </ListItem>
                </div>
              </nav>
          </Drawer>
          <Switch>
            <Route path="/:id" children={<Child />} />
          </Switch>
        </Router>
      );
    }
  }
function Child() {
  let { id } = useParams();
  if (id === 'info') {
    console.log('Information button was clicked !')
    return (
      <div>
        <h3>In development!</h3>
      </div>
  )} else if (id === 'bugs') {
    console.log("Bugs info button was clicked !")
    return (
      <div>
        <h1>
          Warning: findDOMNode is deprecated in StrictMode !
        </h1>
      </div>

    )
  }
}   
export default withStyles(styles)(Sidebar);
  