import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRequestToHome } from '../../utils/actions/Home';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class AddUserToForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
        };
        this.addUser = this.addUser.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addUser(e) {
        e.preventDefault()
        const { userEmail } = this.state
        this.props.sendRequestToHome(userEmail, this.props.user.userInfo.home.homeId)
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.addUser}>
                <div className="form">
                    <TextField
                        id="outlined-name"
                        label="Email nowego członka"
                        className={this.props.classes.textField}
                        value={this.state.userEmail}
                        onChange={this.handleChange('userEmail')}
                        margin="normal"
                        variant="outlined"
                    />
                   
                    <button onClick={this.addUser}>Dodaj członka</button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(store) {
    return {
        user: store.User,
    };
}

const mapDispatchToProps = {
    sendRequestToHome,
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddUserToForm)));