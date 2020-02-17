import { Card, Icon, Button, Form, Input, List, Comment, Avatar } from "antd";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { useInput } from "../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { addCommentRequest } from "../reducers/post";
interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
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
      ></Card>
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
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
