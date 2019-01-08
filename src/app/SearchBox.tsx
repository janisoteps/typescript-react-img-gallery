import * as React from "react"
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
    submitSearch: any;
    classes: any;
    changeFilter: any;
}

const styles = (theme: any) => ({
    container: {
        display: 'flex' as 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: "flex-end"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500
    },
    button: {
        margin: theme.spacing.unit,
        marginRight: "50px"
    },
    overrides: {
        textField: {
            root: {
                color: "#000",
                "&$focused": {
                    color: "#000"
                }
            },
            focused: {
                "&$focused": {
                    color: "#000"
                }
            }
        }
    }
});

class SearchBox extends React.Component<Props, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            anchorEl: null,
            filter: 'all'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    submitSearch = this.props.submitSearch;
    changeFilter = this.props.changeFilter;

    handleChange = (name: any) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (filter: string) => {
        this.setState({
            anchorEl: null,
            filter: filter
        });
        this.changeFilter(filter);
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <form style={{textAlign: "right"}} className={classes.container} noValidate autoComplete="off">
                <div>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        variant="outlined"
                        onClick={this.handleClick}
                        style={{
                            height: "40px",
                            marginTop: "25px",
                            position: "absolute",
                            left: "100px"
                        }}
                    >
                        {this.state.filter === 'all' ? 'Filter' : this.state.filter === 'out of stock'
                        ? 'Out Of Stock' : 'In Stock'}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => {this.handleClose('all')}}
                    >
                        <MenuItem onClick={() => {this.handleClose('out of stock')}}>Out Of Stock</MenuItem>
                        <MenuItem onClick={() => {this.handleClose('in stock')}}>In Stock</MenuItem>
                        <MenuItem onClick={() => {this.handleClose('all')}}>All</MenuItem>
                    </Menu>
                </div>

                <TextField
                    id="with-placeholder"
                    label="Type in your search"
                    placeholder="Product name, ID or group ID"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange('input')}
                />

                <Button
                    style={{height: "40px", marginTop: "25px"}}
                    variant="outlined"
                    className={classes.button}
                    onClick={() => {this.submitSearch(this.state.input)}}
                >
                    Search
                </Button>
            </form>
        );
    }
}


export default withStyles(styles)(SearchBox);
