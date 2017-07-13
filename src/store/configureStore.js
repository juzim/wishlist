import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import wishlistApp from '../reducers'

export default function configureStore(initialState) {
    return createStore(
        wishlistApp,
        initialState,
        applyMiddleware(thunk)
    );
}
