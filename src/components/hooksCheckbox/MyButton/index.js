import React,{useState} from 'react';
import './index.css';

const btnTypes = [
  'primary',
  'success',
  'warn',
  'danger'
]


function MyButton({type,children,...restProps}){
  // console.log({...restProps});
  const createStyleClass = () => {
    let _type = btnTypes.includes(type);
    _type = _type?`btn-${type}`:'btn-primary';
    return ['btn',_type].join(' ');
  }
  return (
    <button
    {...restProps}
    className={createStyleClass()}
    >{children}</button>
  )
}
export default MyButton;
