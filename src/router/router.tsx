import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../types';

import { AuthenticatedRoute } from './AuthenticatedRoute';

// Dashboard wrapper
import { Dashboard } from '../sharedComponents/Dashboard/Dashboard';

// Pages
import { Loading } from '../sharedComponents/Loading';
import { Login } from '../pages/login/Login';
import { Logout } from '../pages/logout/Logout';
import { Calendar } from '../pages/calendar/Calendar';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';
import { UserProfile } from '../pages/userProfile/UserProfile';
import { Notifications } from '../pages/notifications/Notifications';
import { Stations } from '../pages/stations/Stations';

export const RouterComponent: React.FC = () => {
    const { initialized } = useKeycloak();

    if (!initialized) {
        return <Loading />;
    }

    return (
        <Router>
            <Switch>
                <AuthenticatedRoute path="/login" not={<Login />} is={<Redirect to="/" />} />
                <AuthenticatedRoute path="/logout" not={<Redirect to="/" />} is={<Logout />} />
                {/* React-router v5 doesnt support nested switches
                   so this is the best solution until v6 is out. */}
                <Route
                    path="/"
                    render={(props) => (
                        <Dashboard>
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}`}
                                authenticatedRoles={[Roles.Oslo]}
                                not={<Redirect to="/calendar" />}
                                is={<Notifications />}
                            />
                            <Route exact path={`${props.match.url}calendar`} component={Calendar} />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}statistics`}
                                authenticatedRoles={[Roles.Oslo]}
                                not={<Redirect to="/" />}
                                is={() => 'Hello statistics'}
                            />
                            <Route exact path={`${props.match.url}partners`}>
                                Hello partners
                            </Route>
                            <Route exact path={`${props.match.url}stations`} component={Stations} />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}reporting`}
                                authenticatedRoles={[Roles.Partner]}
                                not={<Redirect to="/" />}
                                is={<WeightReporting />}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}profile`}
                                not={<Redirect to="/" />}
                                is={<UserProfile />}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}notifications`}
                                authenticatedRoles={[Roles.Partner, Roles.Ambassador]}
                                not={<Redirect to="/" />}
                                is={<Notifications />}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}settings`}
                                not={<Redirect to="/" />}
                                is={() => 'Hello settings'}
                            />
                        </Dashboard>
                    )}
                />
            </Switch>
        </Router>
    );
};
