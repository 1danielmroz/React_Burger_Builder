import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://reactmyburger-56c92.firebaseio.com/'
});


export default instance;