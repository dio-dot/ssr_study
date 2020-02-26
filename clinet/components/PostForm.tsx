import { Form, Input, Button } from "antd";
import { useInput } from "../utils/common";
import { useCallback, FormEvent, useState, ChangeEvent, useRef } from "react";
import { addPostRequest, uploadImagesRequest, removeImage } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

const PostForm = () => {
  const [text, setText] = useState("");
  const { addingPost,imagePaths } = useSelector((state:RootState) => state.post);
  const dispatch = useDispatch();
  const imageRef = useRef(null);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>)=>{
    console.log(text);
    setText(e.target.value);
  },[text])

  const onSubmitForm = useCallback((e: FormEvent<Element>) => {
    e.preventDefault();
    console.log(text);
    const formData = new FormData();
    imagePaths.forEach((v)=>{
      formData.append('image',v);
    })
    formData.append('content',text);
    dispatch(addPostRequest(formData));
  }, [text,imagePaths]);
  
  const onChangeImages = useCallback((e)=>{
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files,(f)=>{
      imageFormData.append('image',f)
    })
    dispatch(uploadImagesRequest(
      imageFormData
    ))
  },[])
  const onClickImageUpload = useCallback(() =>{
    imageRef.current.click();
  },[imageRef.current])
  const onRemoveImage = useCallback((i)=>()=>{
    dispatch(removeImage(i))
  },[])
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
        <input type="file" multiple hidden ref={imageRef} onChange={onChangeImages}/>
        <Button onClick={onClickImageUpload}>Upload</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={addingPost}
        >
          twit
        </Button>
      </div>
      {
        imagePaths.map((v,i)=>{
          return (
            <div key={v} style={{display:'inline-block'}}>
              <img src={`http://localhost:8080/${v}`} style={{width:'200px'}} alt={v}/>
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          )
        })
      }
    </Form>
  );
};

export default PostForm;
