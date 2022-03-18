import React,{useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';


//using forward ref and useimperativehandle we can forward functionalities
//of child components to its parent component
const Input=React.forwardRef((props,ref)=>{
    const inputRef=useRef();
    const activate=()=>{
        inputRef.current.focus();
    }
    useImperativeHandle(ref,()=>{
        return {
            focus:activate
        }
    })
return <div
className={`${classes.control} ${
  props.isValid === false ? classes.invalid : ''
}`}
>
<label htmlFor={props.id}>{props.label}</label>
<input
  ref={inputRef}
  type={props.type}
  id={props.id}
  value={props.value}
  onChange={props.onChange}
  onBlur={props.onBlur}
/>
</div>;
});

export default Input;