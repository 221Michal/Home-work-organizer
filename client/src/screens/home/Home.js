import React from 'react';
import { connect } from 'react-redux';
import './Home.scss'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        if (!this.props.user.auth) this.props.history.push('/login');
    }

    render() {
        return (
            <div className='home-page'>home</div>
        );
    }
}

function mapStateToProps(store) {
    return {
        user: store.User,
    };
}

const mapDispatchToProps = {
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
