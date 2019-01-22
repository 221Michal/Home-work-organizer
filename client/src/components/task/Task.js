import React from 'react';
import { connect } from 'react-redux';

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);

    }
    
    renderTask(task) {
        console.log(task)
        if (task.taskType === "REQUEST_FOR_HOME") return this.renderRequestForHome(task)
    }

    renderRequestForHome(task) {

        return <div className="request">
            Zaakceptuj prośbę o dołączenie do Home o nazwię {task.taskContent.homeId}
        </div>
    }

    render() {
        if (!this.props.task) return <div></div>
        return (
            <div className="task">
                {this.renderTask(this.props.task)}
            </div>
        );
    }
}


export default Task;