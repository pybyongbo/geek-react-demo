import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Checkbox,Button,Radio,Switch,Divider, Form,Input, Icon,Typography} from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;

const { TextArea } = Input;

const {Paragraph} = Typography


const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

let id = 0;
class  CreateForm extends React.Component {

 render(){

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {remove} = this.props;
    const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
    };
    const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
            return (

                keys.map((k, index) => (
                    
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Passengers' : ''}
                      required={false}
                      key={k}
                    >
                      {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: "Please input passenger's name or delete this field.",
                        }],
                      })(
                        <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                      )}
                      {keys.length > 1 ? (
                        <Icon
                          className="dynamic-delete-button"
                          type="minus-circle-o"
                          onClick={() => remove(k)}
                        />
                      ) : null}
                    </Form.Item>
                  ))
 
            )
         }

}

class DynamicRule extends React.Component {
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        console.log(this.props)
        const {check,checkNick,handleChange} = this.props;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
          };
          const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
          };

          return (
            <div>
              <Form.Item {...formItemLayout} label="Name">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: 'Please input your name',
                  }],
                })(
                  <Input placeholder="Please input your name" />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Nickname">
                {getFieldDecorator('nickname', {
                  rules: [{
                    required: checkNick,
                    message: 'Please input your nickname',
                  }],
                })(
                  <Input placeholder="Please input your nickname" />
                )}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Description">
              {getFieldDecorator('description', {
                  rules: [{
                    required: true,
                    message: 'Please input your description',
                  }],
                })(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
             </Form.Item>

             <Form.Item {...formItemLayout} label="Description">
              {getFieldDecorator('desc', {
                  rules: [{
                    required: true,
                    message: 'Please input your description',
                  }],
                })(
                <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
             </Form.Item>

              <Form.Item {...formTailLayout}>
                <Checkbox
                  checked={checkNick}
                  onChange={handleChange}
                >
                  Nickname is required
                </Checkbox>
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button type="primary" onClick={check}>
                  Check
                </Button>
              </Form.Item>
            </div>
          );
    }

}
  
const EnhancedForm =  Form.create({})(CreateForm);

const InputCheck = Form.create({})(DynamicRule);

class FormCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked:true,
            disabled:false,
            value:1,
            switchVal:'ON',
            lineObj:{
                border:'1px solid #f00',
                marginTop:'8px'
            },
            checkNick: false,
        }
    }
 
    onChangeCheck = (e)=>{
        console.log(e);
    }
    onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }

    onChangeGroup = (checkedValues) =>{
        console.log('checked = ', checkedValues);
    }

    onChange = (e) => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    }

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
      }
    
    toggleDisable = () => {
        this.setState({ disabled: !this.state.disabled });
    }

    onChangeSwitch=(checked)=>{
        console.log(`switch to ${checked}`);
        this.setState({
            switchVal:checked?'ON':'OFF'
        })
    }

    remove = (k) => {
        const { form } = this.ref.props;
        console.log(this.ref.props);
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });

    }

   
    add = () => {
        console.log(this.ref.props.form);
        const { form } = this.ref.props;
        // console.log(form);
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    check = ()=>{
        const { form } = this.txt.props;
        console.log(form);
        form.validateFields((err)=>{
            console.log(err);
            if(!err){
                console.info('success')
            }
        })

    }

    handleChange = (e) => {
        const { form } = this.txt.props;
        this.setState({
          checkNick: e.target.checked,
        }, () => {
          form.validateFields(['nickname'], { force: true });
        });
    }

    onChangeDate = (date,dateString)=>{
        console.log(date,dateString)
    }

    reset = () => { 
        const { form } = this.ref.props;
        form.resetFields()

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.ref.props;
        
        form.validateFields((err, values) => {

          if (!err) {
            const { keys, names } = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', keys.map(key => names[key]));
          }
        });

        this.setState({
            checkNick: e.target.checked,
          }, () => {
            form.validateFields(['nickname'], { force: true });
          });

      }

    render() {
        const label = `${this.state.checked?'Checked':'Unchecked'}-${this.state.disabled?'Disabled':'Enabled'}`;
        const parentMethod =  {
            checkNick:this.state.checkNick, //传递属性值
            check:this.check,
            handleChange:this.handleChange
        }
        const comMethods = {
           
           remove: this.remove, //传递方法
          };

        return (
            <div className="formtest">
                 <RadioGroup onChange={this.onChangeRadio} value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </RadioGroup>
                    <Divider orientation="left">单选按钮组</Divider>
                <div style={{overflow:'hidden'}}>
                    <Checkbox onChange={this.onChangeCheck} value="11">11</Checkbox>
                    <Checkbox onChange={this.onChangeCheck} value="22" defaultChecked={true}>22</Checkbox>
                </div>
                <Divider >复选框设置默认选中</Divider>
                <div>
                <CheckboxGroup options={options}  onChange={this.onChangeGroup} />
                </div>
                <Divider orientation="right">复选框组</Divider>

               <div className="check-enable">
                    <Checkbox
                    checked={this.state.checked}
                    disabled={this.state.disabled}
                    onChange= {this.onChange}
                    >{label}</Checkbox>
               </div>

               <div style={{marginLeft:'20px',overflow:'hidden'}}>
                   <Button
                    type="primary"
                    size="small"
                    onClick={this.toggleChecked}
                   >
                    {!this.state.checked?'Check':'Uncheck'}
                   </Button>

                   <Button
                    style={{marginLeft:'10px',marginRight:'50px'}}
                    type="primary"
                    size="small"
                    onClick={this.toggleDisable}
                   >
                    {!this.state.disabled?'Disable':'Enable'}
                   </Button>


               </div>

               <Divider dashed={true}>Switch开关选项</Divider>

               <Switch defaultChecked onChange={this.onChangeSwitch} style={{float:'left',marginRight:'10px'}}/>

              <div>你设置的switch开关的值为: {this.state.switchVal}</div>

              <div style={{clear:'both'}}>
                Text
                <Divider type="vertical" style={this.state.lineObj}/>
                <a href="#">Link</a>
                <Divider type="vertical" style={{border:'1px solid #f00',marginTop:'8px'}}/>
                <a href="#">Link</a>
              </div>

              <Divider>动态添加字段</Divider>

              <Form onSubmit={this.handleSubmit}>

                <InputCheck {...parentMethod} wrappedComponentRef={(txt) => this.txt = txt}/>
                <EnhancedForm {...comMethods}  wrappedComponentRef={(ref) => this.ref = ref}/>
                
                <FormItem >
                <Button type="dashed" onClick={this.add} style={{ width: '500px',marginLeft:'160px' }}>
                    <Icon type="plus" /> Add field
                </Button>
                </FormItem>
                <FormItem >
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={this.reset}>重置</Button>

                </FormItem>
            </Form>


            </div>
        );
    }
}

export default FormCom;
