import { Menu, Input, Row, Col } from "antd";
import Link from "next/link";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { useEffect, useCallback } from "react";
import { loadUserRequest } from "../reducers/user";
import Router  from "next/router";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user);
  const onSearch = useCallback(value => {
    Router.push(
      { pathname: "/hashtag", query: { tag: value } },
      `hashtag/${value}`
    );
  }, []);
  // const dispatch = useDispatch();
  // useEffect(()=>{
  // if(!me){
  //     dispatch(loadUserRequest())
  // }
  // },[])
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile" prefetch>
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            enterButton
            style={{ verticalAlign: "middle" }}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

export default AppLayout;
