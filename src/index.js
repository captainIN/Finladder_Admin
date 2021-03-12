import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from './store/reducers/authReducer'
import restReducer from './store/reducers/restReducer'
// import sidebarReducer from './store/reducers/sidebarReducer'
// import adminReducer from './store/reducers/adminReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    main: restReducer
})

const persistConfig = {
    key: 'finladder-admin',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)