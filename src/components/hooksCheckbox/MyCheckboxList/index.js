import React,{useCallback, useMemo, useState,useEffect} from 'react';
import MyCheckbox from '../MyCheckbox';
import MyButton from '../MyButton';
import './index.css';


function MyCheckboxList({data,headerCells,allCheckedTip,onCheckedDataChange}){

  const [checkedData,setCheckedData] = useState([]);
  const [originData,setOriginData] = useState(data);
  const dataProps  =originData && originData[0] && Object.keys(originData[0]);

  useEffect(()=>{
    onCheckedDataChange(checkedData);
  },[checkedData]);

  const allCheckedText = useMemo(()=>{
    if(checkedData.length>=0 && checkedData.length<=originData.length ) {
        return allCheckedTip.all || 'Check all';
    } else {
        return allCheckedTip.none ||'cancel all'
    }
  },[checkedData])

  const setAllCheck = useCallback((e)=>{
    const _checked = e.target.checked;
    console.log('_checked',_checked);
    setCheckedData(_checked?originData:[])
  });

  const setSingleCheck = useCallback((e,item)=>{
    const _checked = e.target.checked;
    setCheckedData(checkedData=>(
      _checked?[...checkedData,item]
      :
      checkedData.filter(data=>data.id !== item.id)
    ))

  });

  const removeItem = useCallback((id)=>{
    setOriginData(originData=>originData.filter(item=>item.id!==id));
    setCheckedData(checkedData=>checkedData.filter(item=>item.id!==id));
  })

  return (
    <div>
      <table border="1" width="500" align="center">
        <thead>
          <tr>
            <td colSpan={5} align="left">
              <MyCheckbox
              checked={checkedData.length===originData.length}
              onChange={(e)=>setAllCheck(e)}
              >
                {allCheckedText}
              </MyCheckbox>
            </td>
          </tr>
          {
            headerCells &&
            <tr style={{textAlign:'center',lineHeight:'34px'}}>
              {headerCells.map(item=>(
                <th key={item}>{item}</th>
              ))}
            </tr>
          }
        </thead>
        <tbody>
          {
           originData && originData.map(item=>(
              <tr key={item.id}>
                <td>
                  <MyCheckbox
                    checked={
                      checkedData.some(data=>data.id===item.id)
                    }
                    onChange={(e)=>setSingleCheck(e,item)}
                  >

                  </MyCheckbox>
                </td>
                {
                  // ['id','name','score']
                  dataProps.map(prop=>(
                    <td key={prop}>{item[prop]}</td>
                  ))
                }
                <td>
                  <MyButton
                  type="warn"
                  onClick={()=>removeItem(item.id)}
                  >
                    Delete
                  </MyButton>
                </td>
              </tr>
            ))

          }
        </tbody>

      </table>
    </div>
  )
}
export default MyCheckboxList;
