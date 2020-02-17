import { useState, ChangeEvent, useCallback } from "react";

const useInput= (initialState) =>{
    const [state,setState] = useState(initialState);
    const onChange = useCallback((e:ChangeEvent<HTMLInputElement>) =>{
        setState(e.target.value);
    },[state])
    return [state,onChange]
}

export {
    useInput
}