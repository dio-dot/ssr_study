import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { useEffect, useCallback, useRef } from "react";
import { loadMainPostRequest } from "../reducers/post";

const Home = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts,hasMorePost } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);
  // useEffect(() => {
  //   dispatch(loadMainPostRequest());
  // }, []);
  const onScroll = useCallback(()=>{
    // console.log(window.scrollY,document.documentElement.clientHeight,document.documentElement.scrollHeight)
    if(window.scrollY+document.documentElement.clientHeight>document.documentElement.scrollHeight-100){
      console.log("dispatch");
      if(hasMorePost){
        const lastId = mainPosts[mainPosts.length-1].id;
        if(!countRef.current.includes(lastId)){
          dispatch(loadMainPostRequest(lastId))
          countRef.current.push(lastId)

        }
      }
    }
  },[mainPosts && mainPosts.length,hasMorePost])

  useEffect(()=>{
    window.addEventListener('scroll',onScroll);
    return ()=>window.removeEventListener('scroll',onScroll);
  },[mainPosts && mainPosts.length,hasMorePost])

  return (
    <>
      {me && <PostForm />}
      {mainPosts.map((post) => {
    return <PostCard key={post.id} post={post} />;
    // return <div key={post.id}>{post.content}</div>;
    })}
    </>
  );
};

Home.getInitialProps= async(context) =>{
  context.store.dispatch(loadMainPostRequest());
}

export default Home;
