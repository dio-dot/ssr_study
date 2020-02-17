import { Form, Input, Button } from "antd";
import { useInput } from "../utils/common";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { FormEvent, useCallback } from "react";
import { RootState } from "../reducers";
import { loginRequest } from "../reducers/user";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [pw, onChangePw] = useInput("");
  const { loggingIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(loginRequest({"userId":id,"password":pw}));
    },
    [id, pw]
  );

  return (
    <Form onSubmit={onSubmit} style={{ margin: "10px" }}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-pw">PW</label>
        <br />
        <Input.Password
          name="user-pw"
          value={pw}
          onChange={onChangePw}
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={loggingIn}>
          Login
        </Button>
        <Link href="/signup">
          <a>
            <Button> Sign up</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
