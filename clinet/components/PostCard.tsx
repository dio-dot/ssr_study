import { Card, Icon, Button, Form, Input, List, Comment, Avatar, Popover } from "antd";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { useInput } from "../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import {
  addCommentRequest,
  loadCommentsRequest,
  unlikePostRequest,
  likePostRequest,
  retweetRequest,
  removePostRequest
} from "../reducers/post";
import Link from "next/link";
import Item from "antd/lib/list/Item";
import PostImages from "./PostIamges";
import PostCardContent from "./PostCardContent";
import { followRequest, unfollowRequest } from "../reducers/user";
import styled from 'styled-components';
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
const CardWrapper = styled.div`
  margin-bottom:20px;
`

const PostCard = ({ post }) => {
  const [commentForm, setCommentForm] = useState(false);
  const [comment, onChangeComment] = useInput("");
  const { addingComment } = useSelector((state: RootState) => state.post);
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);
  const onToggleComment = useCallback(() => {
    setCommentForm(!commentForm);
    if (!commentForm) {
      dispatch(loadCommentsRequest(post.id));
    }
  }, [commentForm]);
  const onSubmitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(addCommentRequest({ id: post.id, content: comment }));
    },
    [me && me.id, comment]
  );
  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다.");
    }
    if (liked) {
      dispatch(unlikePostRequest(post.id));
    } else {
      dispatch(likePostRequest(post.id));
    }
  }, [me && me.id, liked]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다.");
    }
    dispatch(retweetRequest(post.id));
  }, [me && me.id, post.id]);

  const onFollow = useCallback((userId)=>()=>{
    dispatch(followRequest(userId))
  },[])

  const onUnfollow = useCallback((userId)=>()=>{
    dispatch(unfollowRequest(userId))
  },[])

  const onRemovePost = useCallback(postId=>()=>{
    dispatch(removePostRequest(postId));
  },[])

  return (
    <CardWrapper>
      <Card
        key={post.createdAt}
        // cover={post.Images[0] && <img alt="example" src={`http://localhost:8080/${post.Images[0].src}`} />}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? "twoTone" : "outlined"}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {me&&post.UserId===me.id?<>
                <Button>수정</Button>
                <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                </>:<Button>신고</Button>}
              </Button.Group>
            )}
          >
              <Icon type="ellipsis" key="ellipsis" />

          </Popover>
        ]}
        title={post.RetweetId ? `${post.User.nickname} retweet` : null}
        extra={
        (!me||post.User.id===me.id)?null:
        me.Followings && me.Followings.find(v=>v.id===post.User.id)?
        <Button onClick={onUnfollow(post.User.id)}>Unfollow</Button>:
        <Button onClick={onFollow(post.User.id)}>Follow</Button>}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={
                <Link
                  href={{ pathname: "/user", query: { id: post.User.id } }}
                  as={`/user/${post.User.id}`}
                >
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link
                href={{ pathname: "/user", query: { id: post.User.id } }}
                as={`/user/${post.User.id}`}
              >
                <a>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
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
            renderItem={(item: any) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: `/user`, query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};
export default PostCard;
