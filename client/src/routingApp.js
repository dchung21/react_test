//Contains routing logic for front end

import React from 'react';
import App from './searchPage/App.js';
import HomeSearch from './homePage/HomeSearch.js';
import ResultPage from './searchPage/Results/ResultPage.js';
import Login from './admin/login.js';
import ClinicContainer from './admin/ClinicContainer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//remove me later probably...
import AddForm from './admin/addClinic.js';

class RoutingApp extends React.Component {
	render () {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/home" component = {HomeSearch} />
					<Route path="/search/:address" component = {App} />
					<Route path="/result/:clinic" component = {ResultPage} />
					<Route path="/login" component = {Login} />
					<Route path="/manage" component = {ClinicContainer} />
					<Route path="/testing" component = {AddForm} />
					<Route path="/" component = {HomeSearch} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default RoutingApp;
