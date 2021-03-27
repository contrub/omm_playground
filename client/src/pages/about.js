// React components
import React from 'react';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import {withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';

// Custom Styles
import styles from "../styles/js/about"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        OMM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class About extends React.Component {

  render() {

    const { classes } = this.props

    return (
      <div>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" className={classes.heading} variant="h2" gutterBottom>
                Open Monument Map
              </Typography>
              <Typography variant="h3" className={classes.heading} paragraph>
                Наша цель
              </Typography>
              <Typography variant="h5" className={classes.heading} paragraph >
                Создать сайт, который предоставляет информацию пользователям архитектурные достопримечательности нашего города, Одесса.
              </Typography>
              <Typography variant="h3" className={classes.heading} paragraph>
                Чем мы пользуемся на нашем проэкте
              </Typography>
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemText primary="React - front end, JavaScript library for building user interfaces or UI components"/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Material-UI - React components for faster and easier web development"/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Bootstrap - HTML, CSS, and JS framework for developing responsive, mobile first projects on the web"/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Node.js - back end, JavaScript server component "/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="MongoDB - database for modern apps"/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Cloudinary - end-to-end image- and video-management solution for websites and mobile apps, covering everything from image and video uploads, storage, manipulations, optimizations to delivery."/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Docker - software for automating the deployment and management of applications in containerized environments"/>
                  </ListItem>
                </List>
              </div>
              <Typography variant="h3" align='center' color="textPrimary" paragraph>
                Наша команда:
              </Typography>
              <div className={classes.root}>
                <List aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemText primary="Онуфрейчук Егор  - Back-end, Front-end (99%)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Полищук Даниил - Front-end (monuments, monument pages)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Столярчук Ярослав - Front-end (about page)" />
                  </ListItem>
                </List>
              </div>
            </Container>
          </div>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Спасибо за внимание
          </Typography>
          {/*<Typography variant="subtitle1" align="center" color="textSecondary">*/}
          {/*  <div>*/}
          {/*    <Link to='/signup'>*/}
          {/*      Sign Up*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <Link to='/home'>*/}
          {/*      Our Monument*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*</Typography>*/}
          <Copyright />
        </footer>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(About)
