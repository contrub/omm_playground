import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    page: {
        margin: '3%',
    },
    pageName: {
        textAlign: "center",
    },
    image: {
        float: 'right',
        margin: '0 0 5px 5px' 
    }
}));
export default function Ekaterina() {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <h1 className={classes.pageName}>Monument to Catherine II</h1>
            <p>
                <img alt='' width="40%" className={classes.image} src="https://planetofhotels.com/sites/default/files/styles/attractionimageoriginal/public/catherine-the-great_2_0.jpg?itok=iZCk1KJY"/>
                According to the inhabitants of Odessa, the monument to Catherine II is a gratitude to the empress and other founders of Odessa for the birth of such a beautiful city. It was at her command in 1794 that the imperial decree on the formation of a port city was signed. For such an imperial decision, 100 years later, or rather, in 1900, the inhabitants of Odessa erected a monument. The construction is a full-length image of the queen on the monument, and a little lower there are 4 more monuments to historical figures, which laid the foundation for the laying of the port. This whole composition is located on an area that has a triangular shape. After the approval of the communist government, the monument was removed and moved to the museum.
            </p>
            <Link to="/monuments_list">Back</Link>
        </div>
    )
}