import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from '../components/homepage/homepage';
import Mainpage from '../components/mainpage/mainpage';

export default function AppRouter() {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/mainpage" exact component={Mainpage} />
            {/* <Redirect from="/*" to="/pagenotfound" /> */}
        </Switch>
        </BrowserRouter>
    )
}

