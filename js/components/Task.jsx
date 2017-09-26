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
    handleClick = () => {
        if (this.state.text != "") {
            this.setState({alert: ""});
            let counter = parseInt(this.props.showCookie('counter'));
            counter++;
            this.props.setCookie('counter', counter, 365);
            let taskName = `task${counter}`;
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
        let tab = this.props.tabOfCookies();
        let lista = tab.map((e, i) => {
            let cookieName = e.split("=")[0];
            let cookieVal = e.split("=")[1];
            return <li key={i}>{cookieVal}
                <button onClick={()=>{this.handleClick1(cookieName)}}>usun</button>
            </li>
        })
        if (this.props.showCookie('name') == undefined) {
            let name = prompt("podaj imie");
            this.props.setCookie('name', name, 365);
            this.props.setCookie('counter', 0, 365);
        }
        return (
            <div>
                <p>Witaj, {this.props.showCookie('name')}</p>
                <input type='text' value={this.state.text} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Dodaj</button>
                <ul>{lista}</ul>
                <p>{this.state.alert}</p>
            </div>
        )

    }
}
export {Task};
