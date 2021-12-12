import React from 'react';

function MyCheckbox({
  children,
  onChange,
  checked
}){

  const createText = () => {

    if(typeof children !== 'string') {
      return ''
    }
    return <span>{children}</span>
  }


  return (
    <div style={{textAlign:'left',paddingLeft:20,height:'30px',lineHeight:'30px'}}>
      <input
      type="checkbox"
      className="my-checkbox"
      checked={checked}
      onChange = {(e)=>{onChange(e)}}
      />{createText()}
    </div>

  )
}
export default MyCheckbox;
