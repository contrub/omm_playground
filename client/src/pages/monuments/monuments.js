// React components
import React from "react";

// Material-UI components
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

// Custom functions
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monuments.css"

class Monuments extends React.Component{
  state = {
    monuments: []
  }

  componentDidMount = () => {

    MonumentService.fetchMonuments()
      .then((res) => {
        this.setState({
          monuments: res
        })
      })
  }

  openMonument = (id) => {
    window.location.href = `/monuments/${id}`
  }

  render() {
    const {monuments} = this.state

    return (
      <div>
        <Grid container spacing={3}  columns={3}>
          {monuments.map((entry, index) => {
            return (
                <Grid item xl={3} key={index} >
                  <Card  id="card">
                    <CardActionArea onClick={() => this.openMonument(entry._id)}>
                      <CardMedia
                        component="img"
                        image={entry.imageURL}
                        title="Learn more"
                        id="img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5"  align="center" color="textPrimary">
                          {entry.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
          })}
        </Grid>
      </div>
    )
  }
}

export default Monuments
