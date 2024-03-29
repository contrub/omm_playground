// React components
import React from "react";

// Custom components
import Loading from "../loading"

// Material-UI components
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

// Local modules
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monuments.css"

class Monuments extends React.Component{
  state = {
    monuments: [],
    isLoading: false
  }

  componentDidMount = () => {

    this.setState({isLoading: true})

    MonumentService.fetchMonuments()
      .then((res) => {
        this.setState({monuments: res, isLoading: false})
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  openMonument = (id) => {
    window.location.href = `/monuments/${id}`
  }

  render() {
    const {monuments, isLoading} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    return (
      <div id="main">
        <Grid container spacing={0}  >
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
                        <Typography gutterBottom   align="center"  id="text">
                        {/*   color="textPrimary" variant="h5"*/}
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
