import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../utils/actions/User';
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

class NewHomeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeName: '',
        };
        this.login = this.login.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    login(e) {
        e.preventDefault()
        const { email, password } = this.state
        const goToUrl = () => this.props.history.push('/');
        this.props.userLogin(email, password, goToUrl)
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.login}>
                <div className="form">
                    <TextField
                        id="outlined-name"
                        label="nazwa home"
                        className={this.props.classes.textField}
                        value={this.state.homeName}
                        onChange={this.handleChange('homeName')}
                        margin="normal"
                        variant="outlined"
                    />
                   
                    <button onClick={this.login}>Załóż home</button>
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
    userLogin,
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewHomeForm)));