import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import initState from './initState';

// redux saga middleware
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(rootSaga);
