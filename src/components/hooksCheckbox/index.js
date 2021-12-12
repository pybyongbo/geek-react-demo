import React,{useState,useCallback,useEffect} from 'react';
import studentData from './data/index.js';
import MyCheckboxList from './MyCheckboxList';


 function App(){

  const [a,setA] = useState(0);
  console.log(studentData);

  const getCheckedData = useCallback((data) => {
    console.log(data);
  });


  return (
    <div>
      <h2>自定义封装全选/取消全选组件</h2>
      <MyCheckboxList
        data={studentData}
        headerCells={
          [
            '选择',
            'ID',
            '姓名',
            '分数',
            '删除'
          ]
        }
        allCheckedTip={
          {
            all:'全部选择',
            none:'全部撤销'
          }
        }
        onCheckedDataChange={getCheckedData}
      >
      </MyCheckboxList>
    </div>
  )
}

export default App;
