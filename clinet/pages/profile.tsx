import { List, Button, Card, Icon, Form, Input } from "antd";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFollowersRequest, loadFollowingsRequest, unfollowRequest, removeFollowerRequest, editNicknameRequest } from "../reducers/user";
import { RootState } from "../reducers";
import { loadUserPostRequest } from "../reducers/post";
import PostCard from "../components/PostCard";

const Profile = ()=>{
    const {me,followingList,followerList} = useSelector((state:RootState)=>state.user);
    const {mainPosts} = useSelector((state:RootState)=>state.post);
    const dispatch = useDispatch();
    const [editName,setEditName] = useState('');

    useEffect(()=>{
        if(me){
            dispatch(loadFollowersRequest(me.id));
            dispatch(loadFollowingsRequest(me.id));
            dispatch(loadUserPostRequest(me.id));
        }

    },[me && me.id])

    const onRemoveFollower=useCallback(userId=>()=>{
        dispatch(removeFollowerRequest(userId));
    },[])

    const onUnfollow = useCallback(userId=>()=>{
        dispatch(unfollowRequest(userId));
    },[])

    const onChangeNickname = useCallback((e)=>{
        setEditName(e.target.value);
    },[])

    const onEditNickname = useCallback((e)=>{
        e.preventDefault();
        dispatch(editNicknameRequest(editName));
    },[editName])
    return (
        <div>
            <Form style={{marginBottom:'20px',border:'1px solid #d9d9d9', padding:'20px'}} onSubmit={onEditNickname}>
                <Input addonBefore="nickname" value={editName} onChange={onChangeNickname}/>
                <Button type="primary" htmlType="submit" >edit</Button>
            </Form>
            <List
                style={{marginBottom:'20px'}}
                grid={{gutter:4,xs:2,md:3}}
                size="small"
                header={<div>Follower List</div>}
                loadMore={<Button style={{width:'100%'}}>More</Button>}
                bordered
                dataSource={followerList?followerList:[]}
                renderItem={(item:any)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)}/>]}>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginBottom:'20px'}}
                grid={{gutter:4,xs:2,md:3}}
                size="small"
                header={<div>Following List</div>}
                loadMore={<Button style={{width:'100%'}}>More</Button>}
                bordered
                dataSource={followingList?followingList:[]}
                renderItem={(item:any)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)}/>] }>
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <div>
                {
                    mainPosts.map(v=>{
                        return <PostCard key={v.id} post={v}/>
                    })
                }
            </div>
        </div>
    )
}

export default Profile;