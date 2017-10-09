import React from 'react';
import ReactDOM from 'react-dom';

import {Category} from './Category.jsx';

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
    tabOfCategoryCookies() {
        let tab = [];
        if (document.cookie != "") {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                if(cookies[i].substring(0,8)=="category"){
                    tab[i] = cookies[i];
                }
                }
            }
        return tab;
    }
    tabOfCategoryValCookies() {
        let tab = [];
        if (document.cookie != "") {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                if(cookies[i].substring(0,8)=="category"){
                    var cookieName = cookies[i].split("=")[0];
                    var cookieVal = cookies[i].split("=")[1];
                    tab[i] = decodeURI(cookieVal);
                }
                }
            }
        return tab;
    }
    tabOfTasksCookies() {
        let tab = [];
        if (document.cookie != "") {
            var cookies = document.cookie.split("; ");
            for (var i = 0; i < cookies.length; i++) {
                    tab[i] = cookies[i];
                }
            }
        return tab;
    }
    render() {
        return <Category setCookie={this.setCookie} showCookie={this.showCookie} tabOfCategoryValCookies={this.tabOfCategoryValCookies} tabOfCategoryCookies={this.tabOfCategoryCookies} tabOfTasksCookies={this.tabOfTasksCookies} deleteCookie={this.deleteCookie}></Category>;
    }
}

export {Cookies};
