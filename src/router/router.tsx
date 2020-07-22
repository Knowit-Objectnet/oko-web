import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../types';

// History
import { historyObj } from './historyObj';
import { AuthenticatedRoute } from './AuthenticatedRoute';

// Dashboard wrapper
import { Dashboard } from '../sharedComponents/Dashboard/Dashboard';

// Pages
import { Loading } from '../pages/loading/Loading';
import { Login } from '../pages/login/Login';
import { Logout } from '../pages/logout/Logout';
import { CalendarPage } from '../pages/calendar/Calendar';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';
import { MyPage } from '../pages/MyPage/MyPage';

export const RouterComponent: React.FC = () => {
    const [, initialized] = useKeycloak();

    if (!initialized) {
        return <Loading />;
    }

    return (
        <Router history={historyObj}>
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
                                is={() => 'Hello overview'}
                            />
                            <Route exact path={`${props.match.url}calendar`} component={CalendarPage} />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}statistics`}
                                authenticatedRoles={[Roles.Oslo]}
                                not={<Redirect to="/" />}
                                is={() => 'Hello statistics'}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}partners`}
                                authenticatedRoles={[Roles.Oslo]}
                                not={<Redirect to="/" />}
                                is={() => 'Hello partners'}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}reporting`}
                                authenticatedRoles={[Roles.Partner]}
                                not={<Redirect to="/" />}
                                is={<WeightReporting />}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}history`}
                                authenticatedRoles={[Roles.Partner, Roles.Ambassador]}
                                not={<Redirect to="/calendar" />}
                                is={() => 'Hello history'}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}info`}
                                authenticatedRoles={[Roles.Partner, Roles.Ambassador]}
                                not={<Redirect to="/calendar" />}
                                is={() => 'Hello info'}
                            />
                            <AuthenticatedRoute
                                exact={true}
                                path={`${props.match.url}profile`}
                                authenticatedRoles={[Roles.Oslo]}
                                not={<Redirect to="/" />}
                                is={<MyPage />}
                            />
                        </Dashboard>
                    )}
                />
            </Switch>
        </Router>
    );
};
