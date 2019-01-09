import * as React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: "21vw",
        minWidth: "300px",
        height: "100%",
        display: "flex" as "flex",
        flexDirection: "column" as "column",
        justifyContent: "space-between",
        '&:hover': {
            boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.65);",
            transitionDuration: "0.3s"
        }
    },
    media: {
        height: 0,
        paddingTop: '75%',
    }
};


function ImageCard(props: any) {
    // console.log(props);
    const classes = props.classes;
    const imageData = props.props;
    const submitImage = props.submitImage;
    const availabilityStyle = imageData.availability === 'out of stock' ? {
        fontWeight: "bold" as "bold",
        color: "#b02639" as "#b02639"
    } : {
        fontWeight: "bold" as "bold"
    };
    return (
        <div style={{
            margin: "20px",
            display: "inline-block"
        }}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={imageData.imageLink}
                    title={imageData.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h4">
                        {imageData.title}
                    </Typography>
                    <Typography
                        component="p"
                        style={{maxHeight: "155px", textOverflow: "ellipsis", overflow: "hidden"}}
                    >
                            {imageData.description}
                    </Typography>
                    <Typography component="p" style={{marginTop: "10px"}}>
                            Product ID: {imageData.id}
                    </Typography>
                    <Typography component="p">
                        Item Group ID: {imageData.itemGroupId}
                    </Typography>
                    <Typography component="p">
                        <span style={availabilityStyle}>
                            Availability: {imageData.availability}
                        </span>
                    </Typography>
                </CardContent>
                <CardActions style={{textAlign: "right", display: "block"}}>
                    <Button
                        className={classes.button}
                        size="large"
                        centerRipple
                        onClick={() => {submitImage(imageData)}}
                    >
                        Use
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default withStyles(styles)(ImageCard);
