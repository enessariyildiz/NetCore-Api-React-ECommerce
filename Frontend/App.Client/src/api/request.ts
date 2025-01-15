import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7244/api/products";

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    console.log("Intercepter");
    console.log(error.response);
    return Promise.reject(error.response);
}
);

const queries = {
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) => axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data)
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`)
}

const request = {
    Catalog
}

export default request