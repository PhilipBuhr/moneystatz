import axios from 'axios';
import {RestService} from "./restService";

jest.mock('axios');

describe('RestService', () => {
    it('should perform get with parameters',  async () => {
        expect.assertions(2);
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test'}));

        let requestParam = {
            param: 'test/encode'
        };
        let restService = new RestService('localhost', 8000);
        let response = restService.get('some/url', requestParam);
        await expect(response).resolves.toEqual({data: 'test'});
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/some/url?param=test%2Fencode');
    });
});
