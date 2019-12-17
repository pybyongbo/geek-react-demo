import React from 'react';
import {Form,Input,Button,Icon,Radio,Select,Checkbox,DatePicker,Typography,Pagination} from 'antd'

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';


const {Paragraph} = Typography;

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const {MonthPicker,RangePicker} = DatePicker;

const options = [
    { label: '上网', value: 'online' },
    { label: '旅游', value: 'Travel' },
    { label: '唱歌', value: 'Sing' },
    { label: '撸代码', value: 'Code' },
  ];
export class FormSubmit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
         sex:0,
         gender:0,
         hobby:[]
        };
      }

     

    onChangeRadio = (e)=>{
        console.log('radio checked', e.target.value);
        this.setState({
          sex: e.target.value,
        });
    }
    handleChange = (val) =>{
        this.setState({
            gender:val
        })
    }
    onChangeGroup = (checkedValues) =>{
        console.log('checked = ', checkedValues);
        this.setState({
            hobby: checkedValues
        })
    }

    onChangeDate = (date,dateString) => {
        console.log(dateString);
    }

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.form.validateFields((errors,values)=>{
            if(!!errors) {
                console.log('Errors in form!!');
                return;
            }
            const formVla = {
                ...values,
                'sex':this.state.sex,
                'gender':this.state.gender,
                'hobby':this.state.hobby,
                'birthday':values['birthday'].format('YYYY-MM-DD')
            }

            console.log(values);
            console.log('提交成功!!');
            console.log(formVla);
        })

    }

    checkTel=(rule, val, cb)=> {
            const telReg = /^1[3456789]\d{9}$/
            if (val && telReg.test(val)) {
                console.log('验证成功')
                cb()
            } else if(val&&!telReg.test(val)){
                cb(new Error('请输入正确的手机号码'))
            } else {
                cb();
            }
            cb();
    }

    checkEmail=(rule, val, cb)=> {
        const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        console.log(val);
        if (val && emailReg.test(val)) {
            console.log('验证成功')
            cb()
        } else if(val){
            cb(new Error('请输入正确的邮箱号哦'))
        } else {
            cb();
        }
        cb();
    }

    checkProfile = (rule,val,cb) =>{
        if(val && (val.length<2||val.length>100)){
            cb(new Error('个人简介应在2~100个字符之间'))
        }
        cb();
    }

    render() {

        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol:{span:3},
            wrapperCol:{span:14},
        }

        const {getFieldDecorator,getFieldProps,getFieldError,isFieldValidating} = this.props.form;
        const telProps = getFieldProps('tel',{
            rules:[
                { required: true,message: '请输入手机号码' },
                {validator:this.checkTel}
            ]
        })

        const emailProps = getFieldProps('email',{
            rules:[
                {required:true,message:'请输入邮箱号码'},
                {validator:this.checkEmail}
            ]
        })

        const profileProps = getFieldProps('profile',{
            rules:[
                { required: true, message: '请输入个人简介' },
                {validator:this.checkProfile}
            ]
        })
        const birthdayProps = getFieldProps('birthday',{
            rules:[
                { required: true, message: '请选择出生年月' },
            ]
        })
        return (
           <Form horizontal="true" prefixCls="loginForm" onSubmit={this.handleSubmit}>

                <FormItem
                    label="姓名"
                    {...formItemLayout}
                    hasFeedback
                >
                <Input {...getFieldProps('name') } addonBefore={<Icon type="user"/>} placeholder="请输入手机号码"/>
                </FormItem>
                
                <FormItem
                    label="性别"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('sex')?'校验中':(getFieldError('sex')||[]).join(',')}
                >
                    <RadioGroup onChange={this.onChangeRadio} value={this.state.sex}>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem
                    label="gender"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('gender')?'校验中':(getFieldError('gender')||[]).join(',')}
                >
                <Select defaultValue="male" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value={0}>male</Option>
                    <Option value={1}>female</Option>
                </Select>
                </FormItem>

                <FormItem
                    label="hobby"
                    {...formItemLayout}
                    // hasFeedback
                    // help={isFieldValidating('hobby')?'校验中':(getFieldError('hobby')||[]).join(',')}
                >
                <CheckboxGroup options={options}  onChange={this.onChangeGroup} />
                </FormItem>

                <FormItem
                    label="出生年月"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('birthday')?'校验中':(getFieldError('birthday')||[]).join(',')}
                >
                {/* <DatePicker 
                locale={locale} 
                showToday={false}
                onChange={this.onChangeDate} 
                format={"YYYY-MM-DD"}
                {...birthdayProps}
                disabledDate={this.disabledDate}/> */}
                {getFieldDecorator('birthday', {
                    rules: [{ type: 'object', required: true, message: '请选择你的出生年月!' }],
                })(
                    <DatePicker showToday={false}/>
                )}

                </FormItem>

                <FormItem
                    label="手机号"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('tel')?'校验中':(getFieldError('tel')||[]).join(',')}
                >
                <Input {...telProps} addonBefore={<Icon type="mobile"/>} placeholder="请输入手机号码"/>
                </FormItem>

                <FormItem
                    label="邮箱号"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('email')?'校验中':(getFieldError('email')||[]).join(',')}
                >
                <Input {...emailProps} addonBefore={<Icon type="code" />} placeholder="请输入邮箱号码"/>
                </FormItem>


                <FormItem
                    label="个人简介"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('profile')?'校验中':(getFieldError('profile')||[]).join(',')}
                >
                <Input.TextArea {...profileProps}  rows={4}  placeholder="请输入个人简介"/>
                </FormItem>

               

              

                <Button type="primary" htmlType="submit">
                    提交
                </Button>

                

           </Form>
        );
    }
}


export default Form.create()(FormSubmit)