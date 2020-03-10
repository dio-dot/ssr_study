import { Form, Input, Checkbox, Button } from "antd";
import { useInput } from "../utils/common";
import { useState, FormEvent, useCallback, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { signUpRequest } from "../reducers/user";
import Router  from "next/router";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Signup = ()=>{
    const [id,onChangeId] = useInput('');
    const [nick,onChangeNick]=useInput('');
    const [pw,onChangePw] = useInput('');
    const [cpw,setCpw] = useState('');
    const [firm,setFirm] = useState(false);
    const [passwordError,setPasswordError]= useState(false);
    const [firmError,setFirmError]= useState(false);

    const {signingUp,me} = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch();

    const onSubmitForm =useCallback((e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(pw!==cpw) return setPasswordError(true)
        if(!firm) return setFirmError(true);
        dispatch(signUpRequest({
            userId:id,
            nickname:nick,
            password:pw,
        }))
    },[id,nick,cpw,pw,firm])

    const onChangeFirm = useCallback((e:CheckboxChangeEvent)=>{
        setFirm(e.target.checked);
    },[firm])
    const onChangeCpw = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        setPasswordError(pw!==e.target.value);
        setCpw(e.target.value);
    },[pw])

    useEffect(()=>{
        if(me){
            Router.push('/')
        }
    },[me && me.id])
    if(me){
        return null;
    }
    return (
        <Form onSubmit={onSubmitForm}>
            <div>
                <label htmlFor="user-id">ID</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId}/>
            </div>
            <div>
                <label htmlFor="user-nick">Nick</label>
                <br/>
                <Input name="user-nick" value={nick} onChange={onChangeNick}/>
            </div>
            <div>
                <label htmlFor="user-pw">Password</label>
                <br/>
                <Input.Password name="user-pw" value={pw} onChange={onChangePw}/>
            </div>
            <div>
                <label htmlFor="user-cpw">Cofirm</label>
                <br/>
                <Input.Password name="user-cpw" value={cpw} onChange={onChangeCpw}/>
                {passwordError && (
                    <div style={{color:'red'}}>You must check pw</div>
                )}
            </div>
            <div>
                <Checkbox name= "user-firm" checked={firm} onChange={onChangeFirm}>
                    Firm
                </Checkbox>
                {firmError && (
                    <div style={{color:'red'}}>You must check firm</div>
                )}
            </div>
            <div>
                <Button type="primary" htmlType="submit" loading={signingUp}>
                    Sign
                </Button>
            </div>
        </Form>
    )
}

export default Signup;