import { combineReducers } from 'redux'
import gateways from './gateway.reducer'
import devices from './devices.reducer'

const rootReducer = combineReducers({
  gateways,
  devices

})
export default rootReducer
