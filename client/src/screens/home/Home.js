import React from 'react';
import { connect } from 'react-redux';
import { userLogOut } from '../../utils/actions/User';
import './Home.scss'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.logOut = this.logOut.bind(this)
    }
    componentDidMount() {
        if (!this.props.user.auth) this.props.history.push('/login');
    }

    logOut() {
        this.props.userLogOut()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className='home-page'>
            {this.props.user.auth && <button onClick={this.logOut}>wyloguj się</button>}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        user: store.User,
    };
}

const mapDispatchToProps = {
    userLogOut,
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
