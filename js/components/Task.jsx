import React from 'react';
import ReactDOM from 'react-dom';

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            alert: "",
        }
    }
    handleChange = (e) => {
        let a = e.target.value
        this.setState({text: a});
    }
    handleClick = (e) => {
        e.preventDefault();
        if (this.state.text != "" && this.props.currentCategory !="") {
            let counter = parseInt(this.props.showCookie('counter'));
            counter++;
            this.props.setCookie('counter', counter, 365);
            let taskName = `${this.props.currentCategory}${counter}`;
            this.props.setCookie(taskName, this.state.text, 365);
            this.setState({text: ""});
        }else if(this.props.currentCategory ==""){
            this.setState({alert: "You must choose category"});
            setTimeout(()=>{this.setState({alert: ""});},2000)
        }else {
            this.setState({alert: "You can't add empty task"});
            setTimeout(()=>{this.setState({alert: ""});},2000)
        }
    }
    handleClick1 = (e) => {
        this.props.deleteCookie(e);
        this.setState({alert: "deleted"});
        setTimeout(()=>{this.setState({alert: ""});},2000)
    }
    render() {
        let tab = this.props.tabOfTasksCookies();
        let lista = tab.map((e, i) => {
            if(e.substring(0,this.props.currentCategory.length) == this.props.currentCategory && (this.props.currentCategory!='')){
                let cookieName = e.split("=")[0];
                let cookieVal = e.split("=")[1];
                return <li key={i}>{cookieVal}
                    <button className="btn btn1"  onClick={()=>{this.handleClick1(cookieName)}}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button className="btn btn2"><i className="fa fa-check-square-o" aria-hidden="true"></i></button>
                    <button className="btn btn3"><i className="fa fa-exclamation" aria-hidden="true"></i></button>
                </li>
            }

        })
        return (
                <div className="task">
                    <h2 className="task-header">{this.props.currentCategory}</h2>
                    <form onSubmit={(e)=>{this.handleClick(e)}}>
                        <input className="task-input" type='text' placeholder="Add task" value={this.state.text} onChange={this.handleChange} ></input>
                        <button className="btn btn4" onClick={(e)=>{this.handleClick(e)}}><i className="fa fa-plus-square-o" aria-hidden="true"></i></button><br></br><br></br>
                    </form>
                    <ul className="task-list">{lista}</ul>
                    <p className="task-alert">{this.state.alert}</p>
                </div>
        )
    }
}
export {Task};
