import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { useEffect } from "react";
import { loadMainPostRequest } from "../reducers/post";

const Home = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadMainPostRequest());
  // }, []);

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
  console.log(Object.keys(context));
  context.store.dispatch(loadMainPostRequest());
}

export default Home;
