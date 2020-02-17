import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Home = ()=>{
    const {me} = useSelector((state:RootState)=>state.user);
    const {mainPosts} = useSelector((state:RootState)=>state.post);
 
    return (
        <>
        {me && <PostForm/>}
        {mainPosts.map((post:Post) =>{return <PostCard key={post.id} post={post}/>})}
        </>
    )
}

export default Home;