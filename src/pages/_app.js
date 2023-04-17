import '@/styles/globals.css'
import Layout from './Layout'
import axios from "axios";

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        window.location.href = "/Login";
        localStorage.removeItem('token');
    }
    return Promise.reject(error);
});

export default function App({Component, pageProps}) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
