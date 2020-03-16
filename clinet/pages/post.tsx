import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { loadPostRequest } from "../reducers/post";
import Helmet from "react-helmet";

const Post = ({ id }) => {
  const {singlePost} = useSelector((state: RootState) => state.post);
  return (
    <>
        <Helmet title = {`${singlePost.User.nickname} 의글`}
                description = {`${singlePost.content}`}
                meta ={[{
                    name:'description',content:singlePost.content 
                },{
                    name:'og:title',content:`${singlePost.User.nickname} 의글`
                },{
                    name:'og:description', content:singlePost.content,
                },{
                    name:'og:image',content:singlePost.Images[0]&&`http://localhost:8080/${singlePost.Images[0].src}`
                },{
                    name:'og:url',content:`http://localhost:8080/post/${id}`
                }]} />
        <div>{singlePost.content}</div>
        <div>{singlePost.User.nickname}</div>
        <div>{singlePost.Images[0]&&<img src={`localhost:8080/${singlePost.Images[0].src}`}/>}</div>
    </>
  );
};

Post.getInitialProps = async(context)=>{
    context.store.dispatch(loadPostRequest(context.query.id))
    return {id:parseInt(context.query.id,10)};
}

export default Post;
