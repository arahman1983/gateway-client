import { Switch, Route } from "react-router-dom";
import {GatewaysPage, Devices} from '../pages'

export default function AppRouts () {
  return(
        <Switch>
          <Route path="/" exact>
            <GatewaysPage />
          </Route>
          <Route path="/:id" exact>
            <Devices />
          </Route>
        </Switch>
  )
}