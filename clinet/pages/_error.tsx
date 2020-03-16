import Error from 'next/error';

export default ({statusCode})=>{
    return(
        <div>
            <h1>에러발생</h1>
            <Error statusCode={statusCode}/>
        </div>
    )
}