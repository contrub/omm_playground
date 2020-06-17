import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: '10px'
    },
    monuments: {
        margin: '4%',
    },
    monumentName: {
        color: 'green',
        fontSize: '20px',
    },
    image: {
        width: '960',
        height: '640'
    }
  }));
export default function Monuments() {
    const classes = useStyles();
    return (
    <Grid container spacing={3}>
        <Grid item xs={3} className={classes.monuments}>
          <Paper className={classes.paper}> 
            <p className={classes.monumentName}>Monument of Catherine II</p>
            <Link to="/monuments/ekaterina">Full Information</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.monuments}>
          <Paper className={classes.paper}>
            <p className={classes.monumentName}>Monument of Orange</p>
            <Link to="/monuments/orange">Full Information</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.monuments}>
            <Paper className={classes.paper}>
                <p className={classes.monumentName}>Monument to Duke de Richelieu</p>
            <Link to="/monuments/duc_de_richelie">Full Information</Link>
          </Paper>
        </Grid>
    </Grid>
    )
}