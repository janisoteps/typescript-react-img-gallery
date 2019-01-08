import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';

const styles = (theme: any) => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function Spinner(props: any) {
    const { classes } = props;
    return (
        <div style={{width: "100vw", textAlign: "center", marginTop: "100px"}}>
            <CircularProgress className={classes.progress} size={100} style={{ color: grey[900] }} thickness={3} />
        </div>
    );
}

export default withStyles(styles)(Spinner);
