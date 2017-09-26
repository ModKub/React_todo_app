import React from 'react';
import ReactDOM from 'react-dom';
import {Task} from './Task.jsx'

class Cookies extends React.Component {
    constructor(props) {
        super(props)
    }
    setCookie(name, val, days) {
        if (days) {
            var data = new Date();
            data.setTime(data.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + data.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + val + expires + "; path=/";
    }
    deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    showCookie(name) {
        if (document.cookie != "") {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                var cookieName = cookies[i].split("=")[0];
                var cookieVal = cookies[i].split("=")[1];
                if (cookieName === name) {
                    return decodeURI(cookieVal)
                }
            }
        }
    }
    tabOfCookies() {
        let tab = [];
        if (document.cookie != "") {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                if(cookies[i].substring(0,4)=="task"){
                    tab[i] = cookies[i];
                }
                }
            }
        return tab;
    }
    render() {
        return <Task setCookie={this.setCookie} showCookie={this.showCookie} tabOfCookies={this.tabOfCookies} deleteCookie={this.deleteCookie}></Task>;
    }
}

export {Cookies};
