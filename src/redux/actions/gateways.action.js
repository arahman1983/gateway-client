import { actionType as type } from '../actionTypes' 


export const getGateways = (gateways) => {
  return {
    type: type.GET_ALL_GATEWAYS,
    gateways
  }
}



export const addGateway = (newGateWay) => {
  return {
    type: type.ADD_GATEWAY,
    newGateWay,
  }
}

export const editGateway = (id, gateway) => {
  return {
    type: type.EDIT_GATEWAY,
    id,
    gateway,
  }
}



export const deleteGateway = (id) => {
  return {
    type: type.DELETE_GATEWAY,
    id
  }
}