import React from 'react';
import { connect } from 'react-redux';
import { userLogOut, userInfo } from '../../utils/actions/User';
import { getHomeInfo } from "../../utils/actions/Home";
import { fetchAllUserTask } from "../../utils/actions/Task";
import './Home.scss'
import NewHomeForm from '../../components/forms/NewHomeForm';
import AddUserToForm from '../../components/forms/AddUserToForm';
import Task from '../../components/task/Task';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.logOut = this.logOut.bind(this)
    }
    componentDidMount() {
        if (!this.props.user.auth) this.props.history.push('/login');
        else this.props.userInfo()
        this.props.fetchAllUserTask()
    }

    logOut() {
        this.props.userLogOut()
        this.props.history.push('/login')
    }

    renderHomeInfo(homeId) {
        if (homeId !== this.props.home.homeId) this.props.getHomeInfo(homeId)

        return <div>
            <h1>{this.props.home.homeName}</h1>
            {
                this.props.home.users &&
                this.renderUserList(this.props.home.users)
            }
        </div>
    }

    renderUserList(users) {
        return <div>
            {this.renderHomeLider(users)}
            {
                users.map(user => {
                    if (!user.leader) return this.renderMember(user)
                })
            }
        </div>
    }

    renderHomeLider(users) {
       const leader = users.find(user => user.leader )
       return  <div>{leader.username} -> szef</div>
    }

    renderMember(user) {
        return <div>{user.username}</div>
    }

    renderTasks(tasks) {
       return tasks.map(task => {
           return <Task task={task} />
        })
        
    }

    render() {
        if (!this.props.user.userInfo.userId) return <div>logowanie</div>
        return (
            <div className='home-page'>
                {this.props.user.auth && <button onClick={this.logOut}>wyloguj się</button>}
                {
                    this.props.user.userInfo.home.homeId ?
                    this.renderHomeInfo(this.props.user.userInfo.home.homeId)
                    : <NewHomeForm /> 
                }
                {
                    this.props.user.userInfo.home.leader &&
                    <AddUserToForm />
                }
                {
                    this.props.tasks.length > 0 &&
                    <div>
                        <h1>Twoje zadania</h1>
                        {this.renderTasks(this.props.tasks)}
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        user: store.User,
        home: store.Home.homeInfo,
        tasks: store.Task.userTasks,
    };
}

const mapDispatchToProps = {
    userLogOut,
    userInfo,
    getHomeInfo,
    fetchAllUserTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
