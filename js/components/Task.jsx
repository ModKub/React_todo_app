import React from 'react';
import ReactDOM from 'react-dom';

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            alert: ""
        }
    }
    handleChange = (e) => {
        let a = e.target.value
        this.setState({text: a});
    }
    handleClick = (e) => {
        e.preventDefault();
        if (this.props.currentCategory == "") {
            this.setState({alert: "You must choose category"});
            setTimeout(() => {
                this.setState({alert: ""});
            }, 2000)
        }else if(this.state.text == ""){
            this.setState({alert: "You can't add empty task"});
            setTimeout(() => {
                this.setState({alert: ""});
            }, 2000)
        }else if(this.state.text.length <= 3){
            this.setState({alert: "More than 3 characters!"});
            setTimeout(() => {
                this.setState({alert: ""});
            }, 2000)
        }else if(this.state.text.length > 30){
            this.setState({alert: "Less than 30 characters!"});
            setTimeout(() => {
                this.setState({alert: ""});
            }, 2000)
        }else{
            let counter = parseInt(this.props.showCookie('counter'));
            counter++;
            this.props.setCookie('counter', counter, 365);
            let taskName = `${this.props.currentCategory}${counter}`;
            this.props.setCookie(taskName, this.state.text, 365);
            this.setState({text: ""});
        }
    }
    handleClick1 = (e) => {
        this.props.deleteCookie(e);
        this.setState({alert: "Deleted"});
        setTimeout(() => {
            this.setState({alert: ""});
        }, 2000)
    }

    render() {
        let objToday = new Date(),
            weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = function() {
                var a = objToday;
                if (/1/.test(parseInt((a + "").charAt(0))))
                    return "th";
                a = parseInt((a + "").charAt(1));
                return 1 == a
                    ? "st"
                    : 2 == a
                        ? "nd"
                        : 3 == a
                            ? "rd"
                            : "th"
            }(),
            dayOfMonth = today + (objToday.getDate() < 10)
                ? '0' + objToday.getDate() + domEnder
                : objToday.getDate() + domEnder,
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
            curMonth = months[objToday.getMonth()],
            curYear = objToday.getFullYear();
        let today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        let tab = this.props.tabOfTasksCookies();
        let lista = tab.map((e, i) => {
            if (e.substring(0, this.props.currentCategory.length) == this.props.currentCategory && (this.props.currentCategory != '')) {
                let cookieName = e.split("=")[0];
                let cookieVal = e.split("=")[1];
                return <div key={i}>
                    <li key={i}>
                        {cookieVal}
                        <button className="task-btn btn1" onClick={() => {
                            this.handleClick1(cookieName)
                        }}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </button>

                    </li>
                    <hr color="lightgrey"></hr>
                </div>
            }

        })
        return (
            <div className="task">
                <div className="task-header">
                    <span className="task-header-date">{today}</span>
                    <span className="task-header-title">{this.props.currentCategory.toUpperCase()}</span>
                </div>
                <form onSubmit={(e) => {
                    this.handleClick(e)
                }}>
                    <button className="task-btn btn4" onClick={(e) => {
                        this.handleClick(e)
                    }}>
                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                    </button>
                    <input className="task-input" type='text' placeholder="Add task" value={this.state.text} onChange={this.handleChange}></input>
                </form>
                <div className="task-list">
                    <ul>{lista}</ul>
                </div>
                <p className="task-alert"> {this.state.alert}  </p>
            </div>
        )
    }
}
export {Task};
