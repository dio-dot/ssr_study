import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import AppLayout from "../components/AppLayout"; 
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from '../reducers';
import rootSaga from '../sagas';
import {Provider} from "react-redux";


const App = ({Component,store,pageProps})=>{
    return (
        <Provider store={store}>
            <Head>
                <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.min.css"
                ></link>
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

App.getInitialProps = async(context)=>{
    console.log(context);
    const {ctx} = context
    let pageProps = {};
    if(context.Component.getInitialProps){
       pageProps =  await context.Component.getInitialProps(ctx)
    }
    return {pageProps};
}

export default withRedux((initialState,options)=>{
    const sagaMiddleWare = createSagaMiddleWare()
    const middleware = [sagaMiddleWare];
    const composeEnhancers = composeWithDevTools({});
    const store = createStore(
        RootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    )
    sagaMiddleWare.run(rootSaga);
    return store
})(App);