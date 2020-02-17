import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import { logoutRequest } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {me} = useSelector((state:RootState)=>state.user)
  // const me = {
  //   nickname: "jinseok",
  //   Post: [],
  //   Following: [],
  //   Follower: []
  // };
  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          <br />
          {me.Post?me.Post.length:0}
        </div>,
        <div key="following">
          Following
          <br />
          {me.Following?me.Following.length:0}
        </div>,
        <div key="follower">
          Follower
          <br />
          {me.Follower?me.Follower.length:0}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
