import { createStore, applyMiddleware,compose  } from 'redux'
import { Provider } from 'react-redux';
import  thunk  from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';


// Use Redux's compose function as a fallback if Redux DevTools are not available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const DataProvider = ({children})=>{
     return(
        <Provider store={store}>
            {children}   
        </Provider>
     )
}

export default DataProvider