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
export default function Orange() {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <h1 className={classes.pageName}>Monument to the Orange</h1>
            <p>
                <img alt='' width="40%" className={classes.image} src="http://www.bestkv.com/_nw/0/15052280.jpg"/>
                As we all know, on May 27, 1794, Empress Catherine II issued a decree deciding on the construction of a commercial sea port in Odessa. But this decree was not enforced during the life of the empress. Over time, Paul I, who received the throne after Catherine II, canceled the decree issued by her and completely stopped financing the construction of the port. The main activity of our city - trade stopped, Odessa fell into a very difficult situation, being almost on the verge of bankruptcy. It seemed that it was already impossible to find a way out of this situation, but the locals, as usual, were ours!
            </p>
            <Link to="/monuments_list">Back</Link>
        </div>
    )
}