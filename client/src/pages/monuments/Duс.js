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
export default function Duc() {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <h1 className={classes.pageName}>Monument to Duke de Richelieu</h1>
            <p>
                <img alt='' width="40%" className={classes.image} src="https://rutraveller.ru/icache/place/5/853/000/58530_603x354.jpg"/>
                Monument to Duke Richelieu (Duke de Richelieu, Armand Emmanuel du Plessis) - the first monument erected in Odessa. The most famous and popular monument is the symbol of Odessa, near which it is always crowded, where Odessa and city visitors love to take pictures in any weather
                And since this monument already existed, and Primorskono Boulevard did not exist yet, the entire architectural ensemble of this part of the city was planned taking into account the location of the monument.
                Behind the Duke monument is a semicircular square, framed by two semicircular buildings; further - Catherine Square, where the monument to the founders of the city is located.
            </p>
            <Link to="/monuments_list">Back</Link>
        </div>
    )
}