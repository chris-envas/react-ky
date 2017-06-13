/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Urls from 'Urls';
// 幻灯片组件
import SlideSwipe from 'kyBase/components/ux/SlideSwipe';
import '../resources/IndexView.less';

import { get, past } from 'kyBase/common/FetchData';
import List from 'kyBase/components/ux/List';
const Item = List.Item;
const Brief = Item.Brief;
// 幻灯片模拟数据
import Banner1 from 'kyBus/home/resources/img/banner1.png';
import Banner2 from 'kyBus/home/resources/img/banner2.png';
const slideList = [
    {
        src: Banner1,
        href: '',
        title: 'Banner1'
    },{
        src: Banner2,
        href: '',
        title: 'Banner2'
    },{
        src: Banner1,
        href: '',
        title: 'Banner2'
    },{
        src: Banner2,
        href: '',
        title: 'Banner2'
    }
];
class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false
        };
    }
    componentDidMount(){
        //console.log('homeInfo: ', this.props.homeInfo);
        /*
        async function axiosGet(){
            try{
                const response = await get(`/api/2`);
                await response;
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }
        axiosGet();
        */

        // const response = get('/api/2', {
        //     a:1,
        //     b:2
        // });
        // console.log(response)
        // response.then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });
    }
    render(){
        return(
                <div className="ky-scrollable">
                    <SlideSwipe List={slideList}/>
                    <List renderHeader={() => '基本样式'} className="my-list">
                      <Item extra={'内容内容'}>标题文字</Item>
                    </List>
                    <List renderHeader={() => '带副标题'} className="my-list">
                        <Item arrow="horizontal" multipleLine>
                          标题文字 <Brief>副标题</Brief>
                        </Item>
                        <Item
                              arrow="horizontal"
                              multipleLine
                              onClick={() => {}}
                              platform="android"
                        >
                              ListItem （Android）<Brief>设置了Click事件会有material水波纹点击效果</Brief>
                        </Item>
                        <Item
                          arrow="horizontal"
                          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                          multipleLine
                          onClick={() => {}}
                        >
                          标题文字 <Brief>副标题</Brief>
                        </Item>
                    </List>
                    <List renderHeader={() => '右侧自定义（无内容 / 文字 / 图片）'} className="my-list">
                        <Item>标题文字</Item>
                        <Item arrow="horizontal" onClick={() => {}}>标题文字</Item>
                        <Item extra="内容内容" arrow="horizontal" onClick={() => {}}>标题文字</Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                          标题文字 <Brief>副标题</Brief>
                        </Item>
                      </List>
                      <List renderHeader={() => '垂直居中对齐'} className="my-list">
                        <Item multipleLine extra="内容内容">
                          标题文字 <Brief>副标题</Brief>
                        </Item>
                      </List>
                      <List renderHeader={() => '左侧带图标'}>
                     <Item
                       thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                       arrow="horizontal"
                       onClick={() => {}}
                     >我的钱包</Item>
                     <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">我的花销占比</Item>
                   </List>
                   <List renderHeader={() => '文字换行'} className="my-list">
                     <Item data-seed="logId">单行模式，文字超长则隐藏；文本内容文本内容文本内容文本内容</Item>
                     <Item wrap>多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容</Item>
                     <Item extra="内容内容" multipleLine align="top" wrap>
                       多行标题文字超长直接折行，文字可能比较长、文字可能比较长、
                     </Item>
                     <Item extra="没有箭头" arrow="empty" className="spe" wrap>
                       极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
                     </Item>
                   </List>
                   <List renderHeader={() => '其他'} className="my-list">
                     <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>点击禁用</Item>
                     <Item>
                       <select defaultValue="1">
                         <option value="1">这是原生 html select</option>
                         <option value="2" disabled>不可选</option>
                         <option value="3">选项3</option>
                       </select>
                     </Item>
                   </List>
                    123456<br/>22222222<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                    body<br/>
                    body<br/>
                    09876<br/>
                    sdfghjmnbvcxz<br/>

                </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        homeInfo: state.HomeModel
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
