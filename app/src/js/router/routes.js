import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Loading, Error } from 'bauhaus-library';

import auth from 'js/applications/auth/hoc';

import NotFound from 'js/applications/shared/not-found/';

import App from 'js/app';
import Role from 'js/applications/administration/roles/home-container';

const pages = process.env.REACT_APP_APPLICATIONS.split(',').reduce(
	(acc, appName) => {
		const app = appName.trim();
		return {
			...acc,
			[app]: lazy(() => import('js/applications/' + app + '/routes')),
		};
	},
	{}
);

const getComponent = pageName => {
	return pages[pageName] || NotFound;
};

const getHomePage = () => {
	const pageNames = Object.keys(pages);
	return pageNames.length === 1 ? (
		<Redirect to={'/' + pageNames[0]} />
	) : (
		<App />
	);
};
export default withRouter(
	auth(({ error }) => (
		<React.Fragment>
			<Suspense fallback={<Loading />}>
				<Switch>
					{error && <Route path="/" component={Error} />}
					<Route exact path="/" render={() => getHomePage()} />
					<Route path="/administration/roles" component={Role} />
					<Route
						path="/(concept|concepts|collections|collection)"
						component={getComponent('concepts')}
					/>
					<Route
						path="/classifications"
						component={getComponent('classifications')}
					/>
					<Route path="/operations" component={getComponent('operations')} />
					<Route path="/dsds" component={getComponent('dsds')} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Suspense>
		</React.Fragment>
	))
);
