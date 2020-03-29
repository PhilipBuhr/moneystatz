import { deleteJar, submitJar } from './transactionActions'
import { Month } from '../service/month';


describe('transactionActions', () => {
    describe('Jar Actions', () => {
        let dispatchMock;
        let mockPost;
        let mockDelete;
        let restService;
        let state;

        beforeEach(() => {
            dispatchMock = jest.fn();
            mockPost = jest.fn().mockImplementation(() => Promise.resolve({}));
            mockDelete = jest.fn().mockImplementation(() => Promise.resolve({}));
            restService = jest.fn();
            restService.post = mockPost;
            restService.delete = mockDelete;

            state = {
                dateState: {
                    month: new Month(3, 2020)
                }
            };
        });

        it('should close modal on success', () => {
            expect.assertions(1);
            const jar = {name: 'someJar', uuid: 'uuid', type: 'expense'};
            const dispatchCallback = submitJar(jar);
            dispatchCallback(dispatchMock, () => state, {restService});
            expect(mockPost).toHaveBeenCalledWith('api/jars', jar);
        });

        it('should delete jar', () => {
            expect.assertions(1);
            const jar = {name: 'someJar', uuid: 'uuid', type: 'expense'};
            const dispatchCallback = deleteJar(jar);
            dispatchCallback(dispatchMock, () => state, { restService });
            expect(mockDelete).toHaveBeenCalledWith('api/jar/uuid');
        });
    });
});
