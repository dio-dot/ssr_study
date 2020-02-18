import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useEffect } from "react";
import PostCard from "../components/PostCard";
import { loadUserPostRequest } from "../reducers/post";
import { Card, Avatar, Button } from "antd";

const User = ({tag}) =>{
    const dispatch = useDispatch();
    const {mainPosts} = useSelector((state:RootState)=>state.post)
    const {userInfo} = useSelector((state:RootState)=>state.user)
    useEffect(()=>{
        dispatch(loadUserPostRequest(tag))
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
                    {userInfo.Post?userInfo.Post.length:0}
                  </div>,
                  <div key="following">
                    Following
                    <br />
                    {userInfo.Following?userInfo.Following.length:0}
                  </div>,
                  <div key="follower">
                    Follower
                    <br />
                    {userInfo.Follower?userInfo.Follower.length:0}
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
                <PostCard key={v.id} post={v}/>
            })
        }
        </div>
    )
}
User.getInitialProps=async(context)=>{
    console.log(`User getInitialProps`,context.query.id)
    return {id:parseInt(context.query.id,10)}
}
export default User