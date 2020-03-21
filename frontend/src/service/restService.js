import axios from 'axios';

export class RestService {
    constructor(host='localhost', port = 8000) {
        this.url = `http://${host}:${port}`
    }

    get(path, params) {
        let param_string = this.buildUrlParams(params);
        return axios.get(`${this.url}/${path}${param_string}`);
    }

    post(path, data) {
        console.log(data);
        const options = {
            headers: {'Content-Type': 'application/json'}
        };
        // return axios.post(`${this.url}/${path}`, JSON.stringify(data), options);
        return axios({
            method: 'POST',
            url: `${this.url}/${path}`,
            data: data,
            headers: options.headers
        })
    }

    buildUrlParams(params) {
        const url_params = [];
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                key = encodeURIComponent(key);
                let value = encodeURIComponent(params[key]);
                url_params.push(`${key}=${value}`);
            }
        }
        return url_params ? `?${url_params.join('&')}` : '';
    }
}
