import Document,{Main, NextScript} from "next/document";
import Helmet from 'react-helmet';

class MyDocument extends Document{
    static getInitialProps(context){
        return {
            helmet:Helmet.renderStatic()
        }
    }
    render (){
        const {htmlAttributes,bodyAttributes,...helmet} = this.props.helmet;
        const htmlAttr = htmlAttributes.toComponent();
        const bodyAttr = bodyAttributes.toComponent();

        return(
            <html {...htmlAttr}>
                <head>
                    {Object.values(helmet).map(el=>el.toComponent())}
                </head>
                <body {...bodyAttr}>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}
