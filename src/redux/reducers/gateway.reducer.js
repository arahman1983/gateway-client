import { actionType as type } from "../actionsTypes";

const gateways = []

export default function gatewaysReducer(state = gateways, action) {
  switch (action.type) {
    case type.GET_ALL_GATEWAYS:
      return action.gateways;
            
    case type.ADD_GATEWAY:
      return  [...state, action.newGateWay]
      
    case type.EDIT_GATEWAY:
      const notModifiedGateways = state.filter(gateway => gateway.id !== action.id)
      return [...notModifiedGateways, action.gateway]
      
    case type.DELETE_GATEWAY:
      return state.filter(gateway => gateway.id !== action.id);
    default:
      return state
  }
}
