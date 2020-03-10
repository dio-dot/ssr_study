import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useEffect } from "react";
import PostCard from "../components/PostCard";
import { loadUserPostRequest } from "../reducers/post";
import { Card, Avatar, Button } from "antd";
import { loadUserRequest } from "../reducers/user";

const User = ({id}) =>{
    const dispatch = useDispatch();
    const {mainPosts} = useSelector((state:RootState)=>state.post)
    const {userInfo} = useSelector((state:RootState)=>state.user)
    // useEffect(()=>{
    //   console.log(mainPosts);
    //     dispatch(loadUserRequest(id))
    //     dispatch(loadUserPostRequest(id))
    // },[])
    return (
        <div>
        {
            userInfo?(
                <Card
                actions={[
                  <div key="twit">
                    Twit
                    <br />
                    {userInfo.Posts?userInfo.Posts.length:0}
                  </div>,
                  <div key="following">
                    Following
                    <br />
                    {userInfo.Followings?userInfo.Followings.length:0}
                  </div>,
                  <div key="follower">
                    Follower
                    <br />
                    {userInfo.Followers?userInfo.Followers.length:0}
                  </div>
                ]}
              >
                <Card.Meta
                  avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                  title={userInfo.nickname}
                />
              </Card> 
            ) :null
        }
        {
            mainPosts.map(v=>{
                return <PostCard key={v.id} post={v}/>
            })
        }
        </div>
    )
}
User.getInitialProps=async(context)=>{
    console.log(`User getInitialProps`,context.query.id)
        // useEffect(()=>{
    //   console.log(mainPosts);
    //     dispatch(loadUserRequest(id))
    //     dispatch(loadUserPostRequest(id))
    // },[])
    context.store.dispatch(loadUserRequest(context.query.id))
    context.store.dispatch(loadUserPostRequest(context.query.id))
    return {id:parseInt(context.query.id,10)}
}
export default User