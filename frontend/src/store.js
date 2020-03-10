import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducer/rootReducer";
import thunk from "redux-thunk";

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

};
