import { Form, Input, Button } from "antd";
import { useInput } from "../utils/common";
import { useCallback, FormEvent, useState, ChangeEvent } from "react";
import { addPostRequest } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

const PostForm = () => {
  const [text, setText] = useState("");
  const { addingPost } = useSelector((state:RootState) => state.post);
  const dispatch = useDispatch();

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>)=>{
    console.log(text);
    setText(e.target.value);
  },[text])

  const onSubmitForm = useCallback((e: FormEvent<Element>) => {
    e.preventDefault();
    console.log(text);
    dispatch(addPostRequest({
      content:text
    }));
  }, [text]);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder=""
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" multiple hidden />
        <Button>Upload</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={addingPost}
        >
          twit
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
