import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import MonumentService from "../../services/MonumentService";
import "../../styles/css/monuments.css"

class Monuments extends React.Component{


  state = {
    monuments: [],
    //monumentInfo: [],
  }

  componentDidMount = () => {

    MonumentService.fetchMonuments()
      .then((res) => {
        this.setState({
          monuments: res
        })
      })
  }

  openmonumentpage = (entry) => {
    const {monuments} = this.state
    console.log(entry.entry._id)

    let id;
    let url;

    id= entry.entry._id +" "
    url="/monuments/" + id;
    window.location.assign(url);
    this.renderMonuments(monuments)

  }

  render() {
    const {monuments} = this.state

    return (
      <div>
        <Grid container spacing={3}  columns={3}>
          {monuments.map((entry) =>{
            return(

              <Grid item xl={3} key={entry._id} >
                <Card  id="card">
                  <CardActionArea onClick={() => this.openmonumentpage({entry})}>
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


            )})}
        </Grid>
      </div>
    )
  }
}

export default Monuments
