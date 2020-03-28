import { submitJar } from './transactionActions'
import { Month } from '../service/month';


describe('transactionActions', () => {
    describe('Jar Actions', () => {
        let dispatchMock;
        let mockPost;
        let restService;
        let state;

        beforeEach(() => {
            dispatchMock = jest.fn();
            mockPost = jest.fn().mockImplementation(() => Promise.resolve({}));
            restService = jest.fn();
            restService.post = mockPost;

            state = {
                dateState: {
                    month: new Month(3, 2020)
                }
            };
        });

        it('should close modal on success', () => {
            expect.assertions(1);
            const dispatchCallback = submitJar('someJar');
            dispatchCallback(dispatchMock, () => state, {restService});
            expect(mockPost).toHaveBeenCalledWith('api/jars', {jar: 'someJar'});
        });
    });
});
