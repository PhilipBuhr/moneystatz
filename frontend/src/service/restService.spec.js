import axios from 'axios';
import {RestService} from "./restService";

jest.mock('axios');

describe('RestService', () => {
    let restService;

    beforeEach(() => {
        restService = new RestService('localhost', 8000);
    });

    it('should perform get with parameters', async () => {
        expect.assertions(2);
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test'}));

        let requestParam = {
            param: 'test/encode'
        };
        let response = restService.get('some/url', requestParam);
        await expect(response).resolves.toEqual({data: 'test'});
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/some/url?param=test%2Fencode');
    });

    it('should perform post as json', async () => {
        expect.assertions(2);
        const transaction = {
            uuid: 'uuid',
            amount: 123,
            jar: 'Einkommen',
            date: '2020-03-01'
        };

        axios.post.mockImplementationOnce(() => Promise.resolve({transaction: transaction}));

        let response = await restService.post('some/url', transaction);
        expect(response.transaction.uuid).toEqual('uuid');
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/some/url', transaction, {headers: {'Content-Type': 'application/json'}})
    });

    it('should deletes resource with id', async () => {
        expect.assertions(1);
        axios.delete.mockImplementationOnce(() => Promise.resolve({}));

        await restService.delete('some/url', 'uuid1234-5678');
        expect(axios.delete).toHaveBeenCalledWith('http://localhost:8000/some/url/uuid1234-5678');
    });
});
