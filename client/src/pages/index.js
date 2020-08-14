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
export default function MonumentById(props) {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <h1 className={classes.pageName}>{props.name}</h1>
            <p>
                {props.description}
            </p>
            <Link to="/monuments">Back</Link>
        </div>
    )
}