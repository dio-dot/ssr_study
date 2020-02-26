import { Card, Icon, Button, Form, Input, List, Comment, Avatar } from "antd";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { useInput } from "../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { addCommentRequest ,loadCommentsRequest, unlikePostRequest, likePostRequest} from "../reducers/post";
import Link from "next/link";
import Item from "antd/lib/list/Item";
import PostImages from "./PostIamges";
// interface PostCardProps {
//   post: Post;
// }

// {
//   "id": 12,
//   "content": "123123",
//   "createdAt": "2020-02-18T02:36:23.000Z",
//   "updatedAt": "2020-02-18T02:36:23.000Z",
//   "UserId": 1,
//   "RetweetId": null,
//   "User": {
//     "id": 1,
//     "nickname": "jinseok"
//   }
// }
const PostCard = ({ post }) => {
  const [commentForm, setCommentForm] = useState(false);
  const [comment, onChangeComment] = useInput("");
  const { addingComment } = useSelector((state: RootState) => state.post);
  const { me } = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch();
  const liked= me && post.Likers && post.Likers.find(v=>v.id===me.id);
  const onToggleComment = useCallback(() => {
    setCommentForm(!commentForm);
    if(!commentForm){
      dispatch(loadCommentsRequest(post.id));
    }
  }, [commentForm]);
  const onSubmitComment = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCommentRequest({id:post.id,content:comment}));
  }, [me && me.id ,comment ]);
  const onToggleLike = useCallback(()=>{
    if(!me){
      return alert('로그인이 필요합니다.');
    }
    if(liked){
      dispatch(unlikePostRequest(post.id))
    }else{
      dispatch(likePostRequest(post.id))
    }
  },[me && me.id,liked])
  return (
    <div>
      <Card
        key={post.createdAt}
        // cover={post.Images[0] && <img alt="example" src={`http://localhost:8080/${post.Images[0].src}`} />}
        cover={post.Images[0] && <PostImages images = {post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" theme={liked?"twoTone":"outlined"} twoToneColor="#eb2f96" onClick={onToggleLike} />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={<Link href={{ pathname:'/user', query:{id:post.User.id} }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
          title={post.User.nickname}
          description={<div>{
            post.content.split(/(#[^\s]+)/g).map((v) => {
            if (v.match(/(#[^\s]+)/g)) {
              return (
                <Link href={{ pathname:'/hashtag', query:{tag:v.slice(1)} }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
              )
            }
            return v;
          })}</div>}
        />
      </Card>
      {commentForm && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={comment}
                onChange={onChangeComment}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={addingComment}>
              Comment
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} comment`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item:any) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Link href={{pathname:`/user` ,query:{id:item.User.id} }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};
export default PostCard;
