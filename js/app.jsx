import React from 'react';
import ReactDOM from 'react-dom';
import {Cookies} from './components/Cookies.jsx'


document.addEventListener('DOMContentLoaded', function() {

    class App extends React.Component {
        render() {
            return <Cookies></Cookies>;
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
