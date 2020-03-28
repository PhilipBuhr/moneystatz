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
        const options = {
            headers: {'Content-Type': 'application/json'}
        };
        return axios.post(`${this.url}/${path}`, data, options);
    }

    delete(path, id) {
        return axios.delete(`${this.url}/${path}/${encodeURIComponent(id)}`);
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

export default RestService;
