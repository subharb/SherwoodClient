import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
  authLayoutRoutes,
  hospitalLayoutRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import PresentationLayout from "../layouts/Presentation";
import Page404 from "../pages/auth/Page404";

const childRoutes = (Layout, routes) =>
  routes.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Guard>
                <Layout>
                  <element.component {...props} />
                </Layout>
              </Guard>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Guard>
            <Layout>
              <Component {...props} />
            </Layout>
          </Guard>
        )}
      />
    ) : null;
  });

let Routes;
if(process.env.REACT_APP_PRODUCT === "HOSPITAL"){
    Routes = () => (
        <Switch>
            {childRoutes(DashboardLayout, hospitalLayoutRoutes)}
            {childRoutes(AuthLayout, authLayoutRoutes)} 
        
            <Route
                render={() => (
                <AuthLayout>
                    <Page404 />
                </AuthLayout>
                )}
            />
        </Switch>
    
    );
}
else{
    Routes = () => (
  
        <Switch>
        {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
        {childRoutes(AuthLayout, authLayoutRoutes)}
        
        <Route
            render={() => (
            <AuthLayout>
                <Page404 />
            </AuthLayout>
            )}
        />
        </Switch>
    
    );
}

export default Routes;
