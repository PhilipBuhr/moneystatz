import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer/rootReducer";
import thunk from "redux-thunk";
import RestService from './service/restService';

const services = {
    restService: new RestService()
};

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk.withExtraArgument(services))
    );

};
