import axios from 'axios'
import { logoutAction } from '../actions/auth.actions'
import store from '../store/index'
const token = localStorage.getItem('firstlogin')
const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Authorization": token ? `${token}` : ''
    }
})
instance.interceptors.request.use((req) => {
    const { token } = store.getState().auth
    if (token) {
        req.headers.Authorization = `${token}`
    }
    return req;
}, (error) => {
    return Promise.reject(error)
})
instance.interceptors.response.use((res) => {
    return res
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if (status === 500 || status === 400) {
        localStorage.clear();
        store.dispatch(logoutAction())
    }
    return Promise.reject(error)
})
export default instance;