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
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};


function ImageCard(props: any) {
    // console.log(props);
    const classes = props.classes;
    const imageData = props.props;
    const submitImage = props.submitImage;

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
                    <Typography gutterBottom variant="headline" component="h2">
                        {imageData.title}
                    </Typography>
                    <Typography component="p">
                        {imageData.description}
                    </Typography>
                    <Typography component="p">
                        Product ID: {imageData.id}  Item Group ID: {imageData.itemGroupId}
                    </Typography>
                </CardContent>
                <CardActions style={{textAlign: "right"}}>
                    <Button
                        size="large"
                        color="primary"
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
