import React from 'react';
import MonumentService from '../services/MonumentService'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#da614e',
    margin: 10
  },
});

class Monuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monuments: []
    }; 
  }
  
  componentDidMount = async() => {
    await MonumentService.fetchMonuments()
      .then(result => {
        this.setState({
          monuments: result
        })
      })
    if (this.state.monuments.length === 0) {
      alert('No monuments !')
    }
  }
  render() {
    const {classes} = this.props
    const {monuments} = this.state
    const result = monuments.map((entry, index) => {
      return (
        <React.Fragment key={index}>
          <Grid item xs={4}>
            <Paper className={classes.paper} onClick={() => alert(entry.name)}>
              {entry.name}
              <img alt="monument" src="https://img.icons8.com/material/4ac144/256/camera.png"/>
            </Paper>
          </Grid>
        </React.Fragment>
      )
    });
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {result}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Monuments)