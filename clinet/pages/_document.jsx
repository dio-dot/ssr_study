import Document,{Html, Head, Main, NextScript } from "next/document";
import App,{AppInitialProps} from 'next/app';
import {ServerStyleSheet} from 'styled-components';
import Helmet from 'react-helmet';

class MyDocument extends Document{
    static async getInitialProps(context){
        const sheet = new ServerStyleSheet();
        context.renderPage((App)=>(props)=>sheet.collectStyles(<App {...props}/>))
        const styleTags = sheet.getStyleElement();
        const initialProps = await Document.getInitialProps(context); 

        return {
            ...initialProps,
            // ...page,
            styleTags,
            helmet:Helmet.renderStatic()
        }
    }
    render (){
        const {htmlAttributes,bodyAttributes,...helmet} = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return(
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map((el)=>el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}

export default MyDocument