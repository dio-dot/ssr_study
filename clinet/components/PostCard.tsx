import { Card, Icon, Button, Form, Input, List, Comment, Avatar } from "antd";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { useInput } from "../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { addCommentRequest } from "../reducers/post";
import Link from "next/link";
import Item from "antd/lib/list/Item";
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
  const dispatch = useDispatch();
  const onToggleComment = useCallback(() => {
    setCommentForm(!commentForm);
  }, [commentForm]);
  const onSubmitComment = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCommentRequest(post.id));
  }, []);

  return (
    <div>
      <Card
        key={post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={<Link href={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
          title={post.User.nickname}
          description={<div>{
            post.content.split(/(#[^\s]+)/g).map((v) => {
            if (v.match(/(#[^\s]+)/g)) {
              return (
                <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
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
            // dataSource={post.Comments || []}
            // renderItem={item => (
            //   <li>
            //     <Comment
            //       author={item.User.nickname}
            //       avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
            //       content={item.content}
            //       datetime={item.createdAt}
            //     />
            //   </li>
            // )}
              renderItem={
                post.Comments.map(v=>{
                  return (
                    <Comment
                      author={v.User.nickname}
                      avatar={<Link href={`/user/${v.User.id}`}><a><Avatar>{v.User.nickname[0]}</Avatar></a></Link>}
                      content={v.User.content}
                      datetime={v.User.createdAt}
                    />
                  )
                })
              }
          />
        </>
      )}
    </div>
  );
};
export default PostCard;
