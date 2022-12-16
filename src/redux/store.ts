import { rootReducer } from './reducers/index';
import { legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools()
    );

export default store;
