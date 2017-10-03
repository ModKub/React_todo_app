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
        if (this.state.text != "") {
            this.setState({alert: ""});
            let counter = parseInt(this.props.showCookie('counter'));
            counter++;
            this.props.setCookie('counter', counter, 365);
            let taskName = `${this.props.currentCategory}${counter}`;
            this.props.setCookie(taskName, this.state.text, 365);
            this.setState({text: ""});
        } else {
            this.setState({alert: "You can't add empty task"});
        }
    }
    handleClick1 = (e) => {
        this.props.deleteCookie(e);
        this.setState({alert: "deleted"});
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
        if (this.props.showCookie('name') == undefined) {
            let name = prompt("podaj imie");
            this.props.setCookie('name', name, 365);
            this.props.setCookie('counter', 0, 365);
            this.props.setCookie('counter1', 0, 365);
        }
        return (
                <div className="right-side">
                    <h2 className="header">Shopping</h2>
                    <form onSubmit={(e)=>{this.handleClick(e)}}>
                        <input className="inputStyle" type='text' placeholder="Add task" value={this.state.text} onChange={this.handleChange} ></input>
                        <button className="btn btn4" onClick={(e)=>{this.handleClick(e)}}><i className="fa fa-plus-square-o" aria-hidden="true"></i></button><br></br><br></br>
                    </form>
                    <ul className="listOfTasks">{lista}</ul>
                    <p className="alert">{this.state.alert}<br></br> {this.props.alert}</p>
                </div>
        )
    }
}
export {Task};
