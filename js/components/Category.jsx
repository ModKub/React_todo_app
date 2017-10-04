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
        let tabOfTasksCookies = this.props.tabOfTasksCookies();
        let valCookie  = this.props.showCookie(e);
        let newTab = tabOfTasksCookies.map(function(el, i) {
            return el.substring(0, valCookie.length);
        });
        if(newTab.indexOf(valCookie)!==-1){
            this.setState({alert: "Delete tasks first!"});
            setTimeout(()=>{this.setState({alert: ""});},2000)
        }else{
            this.props.deleteCookie(e);
            this.setState({alert: "deleted"});
            setTimeout(()=>{this.setState({alert: ""});},2000)
        }
}

    handleClick2 = (e) =>{
        let tab = [];
        tab = this.state.listOfCategory;
        e.preventDefault();
        if (this.state.category != "") {
            let counter = parseInt(this.props.showCookie('counter1'));
            counter++;
            this.props.setCookie('counter1', counter, 365);
            let categoryName = `category${counter}`;
            this.props.setCookie(categoryName, this.state.category, 365);
            this.setState({category: ""});
        } else {

            this.setState({alert: "Can't add empty category !!"});
            setTimeout(()=>{this.setState({alert: ""});},2000)
        }
    }
    handleClick3 = (e) =>{
        this.setState({currentCategory: e})
    }
    render() {
        if (this.props.showCookie('name') == undefined) {
            let name = prompt("enter your name and surname");
            this.props.setCookie('name', name, 365);
            this.props.setCookie('counter', 0, 365);
            this.props.setCookie('counter1', 0, 365);
        }
        let tab = this.props.tabOfCategoryCookies();
        let listOfCategory = tab.map((e, i) => {
            let cookieName = e.split("=")[0];
            let cookieVal = e.split("=")[1];
            return <li key={i} onClick={()=>{this.handleClick3(cookieVal)}}><i className="fa fa-list category-list-icon" aria-hidden="true"></i> {cookieVal}
                   <button className="category-delete-button"  onClick={()=>{this.handleClick1(cookieName)}}  > <i className="fa fa-minus-square-o" aria-hidden="true"></i></button></li>
            })
        return (
            <div className="container">
            <div className="category">
            <div><img className="category-avatar"  src="css/avatar.png"></img> <span className="category-name">{this.props.showCookie('name')}</span></div>
                <br></br>
            <div>Category</div>
            <div className="category-list">
                <ul>{listOfCategory}</ul>
                <div className="category-add">
                    <p className="category-alert">{this.state.alert}</p>
                    <form onSubmit={(e)=>{this.handleClick2(e)}}>
                        <button className="category-add-button" onClick={(e)=>{this.handleClick2(e)}}><i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                        <input className="category-input" type='text' placeholder="Add category"  value={this.state.category} onChange={this.handleChange1}></input>
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
