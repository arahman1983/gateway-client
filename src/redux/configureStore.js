import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function configureStore(initialStore) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const persistConfig = {
    key: 'root',
    storage,
    whiltelist: ['navigation'],
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(
    persistedReducer,
    initialStore,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
