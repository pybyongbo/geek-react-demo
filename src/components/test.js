import React from "react";
import ReactDOM from "react-dom";
import { Button, Input ,Upload, Icon } from 'antd';
import { Typography, Pagination, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const { Paragraph } = Typography;
class Appdemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            inputText: '',
            mode: 'view',
            str: 'This is an editable text.',
            currentPage:1
        };
    }
    onChange = str => {
        console.log('Content change:', str);
        this.setState({
            str
        })
    }

    handleChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }
    handleSave = () => {
        this.setState({
            text: this.state.inputText,
            mode: 'view'
        })
    }
    handEdit = () => {
        this.setState({
            mode: ''
        })
    }
    renderInputField() {
        if (this.state.mode === "view") {
            return <div />;
        } else {
            return (
                <p style={{ width: '320px' }}>
                    <Input onChange={this.handleChange} value={this.state.inputText} />
                </p>
            );
        }
    }

    renderButton() {
        if (this.state.mode === "view") {
            return <Button onClick={this.handEdit}>Edit</Button>;
        } else {
            return <Button onClick={this.handleSave}>Save</Button>;
        }
    }

    onShowSizeChange = (current,pageSize)=>{
        this.setState({
            currentPage:1
        })
        console.log(current,pageSize)
    }

    showTotal=(total,range) => {
        const rangStr = range.join('~');
        return `共${total}条记录，当前是第${this.state.currentPage}页,显示数据第${rangStr}条`;
    }
    oncpageChange = (page,pageSize)=>{
        this.setState({
            currentPage:page
        })
    }

    render() {
        const sysConfig = {
            locale: zh_CN,
        };
        const fileList = [
            {
              uid: '-1',
              name: '123.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-2',
              name: 'yyy.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ];

          const props0 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'text',
            defaultFileList: [...fileList],
          };

          const props1 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
            defaultFileList: [...fileList],
          };
          
          const props2 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture-card',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
          };
          
          
        return (
            <ConfigProvider {...sysConfig}>
                <div>
                    <p>Text:{this.state.text}</p>
                    {this.renderInputField()}
                    {this.renderButton()}
                    <br /><br />
                    <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>

                    <br /><br />
                    <Upload {...props0}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                    </Upload>

                    <br/>

                    <Upload {...props1}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                    </Upload>

                    <br/>
                    <Upload {...props2}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                    </Upload>


                    <br/>
                    <br/>
                    <Pagination 
                    current={this.state.currentPage} 
                    total={500}
                    showLessItems={true}
                    showTotal={this.showTotal}
                    onChange = {this.oncpageChange}
                    showSizeChanger 
                    onShowSizeChange={this.onShowSizeChange} 
                    showQuickJumper></Pagination>
                </div>
            </ConfigProvider>
        );
    }
}

export default Appdemo;
