import React from 'react';
import ReactDOM from 'react-dom';
import {Task} from './Task.jsx';

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "",
            alert: "",
            currentCategory: "",
        }
    }
    handleChange1 = (e) => {
        let a = e.target.value
        this.setState({category: a});
    }
    handleClick1 = (e) => {
        this.props.deleteCookie(e);
        this.setState({alert: "deleted"});
    }
    handleClick2 = (e) =>{
        let tab = [];
        tab = this.state.listOfCategory;
        e.preventDefault();
        if (this.state.category != "") {
            this.setState({alert: ""});
            let counter = parseInt(this.props.showCookie('counter1'));
            counter++;
            this.props.setCookie('counter1', counter, 365);
            let categoryName = `category${counter}`;
            this.props.setCookie(categoryName, this.state.category, 365);
            this.setState({category: ""});
        } else {
            this.setState({alert: "You can't add empty category"});
        }
    }
    handleClick3 = (e) =>{
        this.setState({currentCategory: e})
    }
    render() {
        let tab = this.props.tabOfCategoryCookies();
        let listOfCategory = tab.map((e, i) => {
            let cookieName = e.split("=")[0];
            let cookieVal = e.split("=")[1];
            return <li key={i} onClick={()=>{this.handleClick3(cookieVal)}}>{cookieVal}
                <button  onClick={()=>{this.handleClick1(cookieName)}}  ><i className="fa fa-ban" aria-hidden="true"></i></button></li>
            })
        return (
            <div  className="container">
            <div className="left-side">
            <h2>Hello, {this.props.showCookie('name')}</h2>
            <div>Category</div>
            <div className="category">
                <ul>{listOfCategory}</ul>
                <div className="addCategory">
                    <form onSubmit={(e)=>{this.handleClick2(e)}}>
                        <button onClick={(e)=>{this.handleClick2(e)}}><i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                        <input className="inputStyle" type='text' placeholder="Add category"  value={this.state.category} onChange={this.handleChange1}></input>
                    </form>
                </div>
            </div>
            </div>
            <Task currentCategory={this.state.currentCategory} setCookie={this.props.setCookie} showCookie={this.props.showCookie} tabOfTasksCookies={this.props.tabOfTasksCookies} deleteCookie={this.props.deleteCookie} alert={this.state.alert}></Task>
            </div>
        )

    }
}

export {Category};
