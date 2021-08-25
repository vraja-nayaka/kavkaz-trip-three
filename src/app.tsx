import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainPage } from "./pages/main-page/MainPage";
import { TripPage } from "./pages/trip-page/TripPage";
import { routeNames } from "./routes";


const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routeNames.main}>
        <MainPage />
      </Route>
      <Route exact path={routeNames.trip}>
        <TripPage />
      </Route>
    </Switch>
  );
};

export { App };
