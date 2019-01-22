import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/forms/LoginForm';
import RegisterForm from '../../components/forms/RegisterForm';
import './startPage.scss'

class startPage extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <div className="start-page">
                <div className="start-form login">
                    <LoginForm />
                </div>
                <div className="start-form register">
                    <RegisterForm/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {

    };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(startPage);
