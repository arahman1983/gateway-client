import { actionType as type } from "../actionTypes";

const devices = {
  devicesArray: [],
  count: 0,
};

export default function devicesReducer(state = devices, action) {
  switch (action.type) {
    case type.GET_ALL_DEVICES:
      return {
        devicesArray : action.devices,
        count: action.count
      };
      
    case type.GET_ALL_DEVICES_COUNT:
      return {
        devicesArray : state.devicesArray,
        count: action.count
      };
      
    case type.ADD_DEVICE:
      return {
        devicesArray : [state.devicesArray, action.device],
        count: state.count + 1
      };
      
    case type.EDIT_DEVICE:
      const notModifiedDevices = state.devicesArray.filter(device => device.id !== action.id)
      return {
        devicesArray: [...notModifiedDevices, action.device],
        count: state.count,
      };
      
    case type.DELETE_DEVICES:
      return {
        devicesArray: state.devicesArray.filter(device => device.id !== action.id),
        count: state.count
      };
    default:
      return state
  }
}
