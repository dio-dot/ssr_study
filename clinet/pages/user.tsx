import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useEffect } from "react";
import PostCard from "../components/PostCard";
import { loadUserPostRequest } from "../reducers/post";
import { Card, Avatar, Button } from "antd";
import { loadUserRequest } from "../reducers/user";

const User = ({user}) =>{
    const dispatch = useDispatch();
    const {mainPosts} = useSelector((state:RootState)=>state.post)
    const {userInfo} = useSelector((state:RootState)=>state.user)
    useEffect(()=>{
      console.log(mainPosts);
        dispatch(loadUserRequest(user))
        dispatch(loadUserPostRequest(user))
    },[])
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
    console.log(`User getInitialProps`,context.query.user)
    return {user:parseInt(context.query.user,10)}
}
export default User