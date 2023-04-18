import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import Home from './components/pages/Home';
import List from './components/pages/List';
import NotFound from './components/pages/NotFound';


export default function AppComponent({ portletNamespace, contextPath, portletElementId, configuration }) {

	return (

		<Router>
			<Routes>
				<Route exact path="/" element={ <Home configuration={configuration.portletInstance}/> } />
				<Route path="/lista" element={ <List configuration={configuration.portletInstance}/> } />
				<Route path="*" element={ <NotFound/> } />
			</Routes>
		</Router>

	);
}