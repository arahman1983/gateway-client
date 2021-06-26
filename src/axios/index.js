import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://gatewayapis.herokuapp.com',
})


export default axiosInstance