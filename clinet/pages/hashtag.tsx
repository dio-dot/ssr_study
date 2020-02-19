import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { RootState } from "../reducers";
import PostCard from "../components/PostCard";
import { loadHashtagPostRequest } from "../reducers/post";

const Hashtag = ({tag}) =>{
    const dispatch = useDispatch();
    const {mainPosts} = useSelector((state:RootState)=>state.post)
    
    useEffect(()=>{
        dispatch(loadHashtagPostRequest(tag))
    },[])
    return (
        <div>
        {
            mainPosts.map(v=>{
                return <PostCard key={v.id} post={v}/>
            })
        }
        </div>
    )
}
Hashtag.getInitialProps=async(context)=>{

    console.log(`hashtag getInitialProps`,context.query.tag)
    return {tag:context.query.tag}
}
export default Hashtag