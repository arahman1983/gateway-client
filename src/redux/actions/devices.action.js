import { actionType as type } from '../actionsTypes' 


export const getDevices = (devices, count) => {
  return {
    type: type.GET_ALL_DEVICES,
    devices,
    count
  }
}

export const getDevicesCount = (count) => {
  return {
    type: type.GET_ALL_DEVICES_COUNT,
    count
  }
}

export const addDevice = (newDevice) => {
  return {
    type: type.ADD_DEVICE,
    newDevice,
  }
}

export const editDevice = (id, device) => {
  return {
    type: type.EDIT_DEVICE,
    id,
    device,
  }
}



export const deleteDevice = (id) => {
  return {
    type: type.DELETE_DEVICE,
    id
  }
}