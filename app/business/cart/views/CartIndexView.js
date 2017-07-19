/**
 * @fileOverview 购物车首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';
import classNames from 'classnames';

import { Button, Toast, NavBar, Stepper, List } from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;
import { Cache } from 'kyCommon';

import CartItemView from './CartItemView';

import '../resources/CartIndexView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 2,
            list: [
                {text:'6点起床',isChecked:false, num: 1},
                {text:'7点出门',isChecked:true, num: 2},
                {text:'8点吃早饭',isChecked:true, num: 3},
                {text:'9点上班',isChecked:true, num: 4},
                {text:'12点下班',isChecked:true, num: 5}
            ],
            isAllChecked: false,
        };
        this.changeStatus = this.changeStatus.bind(this);
    }
    componentDidMount(){
        this.checkAll();
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    //改变数量
    numItemChangeHandle(index, num){
        this.state.list[index].num = num;
        this.setState({
            list: this.state.list,
            refresh:Math.random()
        });
    }
    /**
     * @description 单个商品单选框的属性
     * @param {number} index 索引
     * @param {boolean} isChecked 是否选中
     * @returns {Voild}
    */
    changeStatus(index,isChecked) {
        console.log('单选：', index, isChecked)
        this.state.list[index].isChecked = isChecked;
        this.setState({
            list: this.state.list,
            refresh:Math.random()
        });
        this.checkAll();
    }

     /**
      * @description 删除指定的一项
      * @param {number} index 索引
      * @returns {Voild}
     */
    deleteItemHandle(index){
        this.state.list.splice(index,1);
        //删除完成后来更新下页面的内容
        this.setState({
            list : this.state.list,
            refresh:Math.random()
        });
    }

    /*
     * @description 判断是否全选
     * 如果所有产品都选择了，就设置isAllChecked为true
    */
    checkAll(){
        if(this.state.list.every(function(list){ return list.isChecked })){
            this.setState({
                isAllChecked: true
            });
        }else {
            this.setState({
                isAllChecked: false
            });
        }
    }

    /*
      * @description 全选
      * @param {object} e 事件对象
     */
    changeAllStatus(e){
        const checked = e.target.checked;
        //修改每个产品的状态
        this.state.list.forEach(function(list){
            list.isChecked = checked;
        });
        //修改isAllChecked里面的值
        this.setState({
            list:this.state.list,
            isAllChecked:checked
        });
    }
    render(){
        console.log(this.state)
        const isAllCheckedCls = classNames({
            [`icon`]: true,
            [`icon-radio`]: true,
            [`icon-radioSelect`]: this.state.isAllChecked,
        });
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable">
                    <div className="ky-cart">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            ><div className="navbar-cart-tit"><i className="icon icon-shoppingCart"></i>购物车</div></NavBar>

                            <div className="m-cart">
                                {this.state.list.map((item, index)=>{
                                    return(
                                        <CartItemView key={index} index={index} ListItem={item} deleteItem={this.deleteItemHandle.bind(this)} changeStatus={this.changeStatus} numItem={this.numItemChangeHandle.bind(this)}/>
                                    )
                                })}

                                {/* <div className="cart-item">
                                    <div className="item-header">
                                        <div className="header-name">
                                            <label>
                                                <div className="pack-radio">
                                                    <input type="checkbox" />
                                                    <i className="icon icon-radio"></i>
                                                </div>
                                            </label>
                                            <span className="name">新乐思</span>
                                        </div>
                                        <div className="header-price">
                                            <span>合计 <i className="price">￥4,200.00</i></span>
                                            <i className="icon icon-cancel"></i>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <div className="thumb">
                                            <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                        </div>
                                        <div className="info">
                                            <div className="info-item">
                                                <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                <div className="number">数量</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="name">
                                                    <p>蓝莓复合果汁饮品(便利装) </p>
                                                    <p>900毫升 (30袋)</p>
                                                </div>
                                                <div className="number">12件/套</div>
                                            </div>
                                            <div className="info-subtotal">
                                                <span>会员价</span>
                                                <span className="price">￥420.00</span>
                                            </div>
                                            <div className="info-foot">
                                                <Stepper
                                                    showNumber
                                                    min={1}
                                                    max={500}
                                                    value={this.state.showNumber}
                                                    onChange={this.onChange}
                                                    onOkClick={this.onClickHandle}
                                                />
                                                <span className="isstock">有货</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-item cart-item-guoups">
                                    <div className="item-header">
                                        <div className="header-name">
                                            <i className="icon icon-radio icon-selectFill"></i>

                                            <span className="name">家庭健康组合</span>
                                        </div>
                                        <div className="header-price">
                                            <span>合计 <i className="price">￥4,200.00</i></span>
                                            <i className="icon icon-cancel"></i>
                                        </div>
                                    </div>
                                    <div className="guoups-item">
                                        <div className="item-content">
                                            <div className="thumb">
                                                <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                            </div>
                                            <div className="info">
                                                <div className="info-item">
                                                    <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                    <div className="number">数量</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="name">
                                                        <p>蓝莓复合果汁饮品(便利装) </p>
                                                        <p>900毫升 (30袋)</p>
                                                    </div>
                                                    <div className="number">12件/套</div>
                                                </div>
                                                <div className="info-item info-item-member">
                                                    <div className="name">
                                                        <span>会员价</span><span className="price">￥420.00</span>
                                                    </div>
                                                    <div className="number">x 1</div>
                                                </div>
                                                <div className="info-subtotal">
                                                    <span>小计&nbsp;&nbsp;</span>
                                                    <span className="price">￥420.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="thumb">
                                                <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                            </div>
                                            <div className="info">
                                                <div className="info-item">
                                                    <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                    <div className="number">数量</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="name">
                                                        <p>蓝莓复合果汁饮品(便利装) </p>
                                                        <p>900毫升 (30袋)</p>
                                                    </div>
                                                    <div className="number">12件/套</div>
                                                </div>
                                                <div className="info-item info-item-member">
                                                    <div className="name">
                                                        <span>会员价</span><span className="price">￥420.00</span>
                                                    </div>
                                                    <div className="number">x 1</div>
                                                </div>
                                                <div className="info-subtotal">
                                                    <span>小计&nbsp;&nbsp;</span>
                                                    <span className="price">￥420.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info-foot">
                                            <Stepper
                                                showNumber
                                                min={1}
                                                max={500}
                                                value={this.state.showNumber}
                                                onChange={this.onChange}
                                                onOkClick={this.onClickHandle}
                                            />
                                            <span className="isstock">有货</span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="m-cart-other">
                                <List small>
                                  <Item extra={'14'}>商品数量</Item>
                                  <Item extra={'￥21,400.00'}>会员价总计</Item>
                                  <Item extra={'￥21,400.00'}>销售价总计</Item>
                                  <Item extra={'-￥21,400.00'}>总优惠</Item>
                                </List>
                            </div>
                    </div>
                </div>
                <div className="m-foot-fixed">
                    {/* 立即结算 */}
                    <div className="m-settlement">
                        <div className="select">
                            <label>
                                <div className="pack-radio">
                                    <input type="checkbox" checked={this.state.isAllChecked} onChange={this.changeAllStatus.bind(this)}/>
                                    <i className={isAllCheckedCls}></i>
                                </div>
                            </label>
                            <span>全选</span>
                        </div>
                        <div className="total">
                            <span>总计</span>
                            <span className="price"> ￥18,328.00</span>
                        </div>
                        <div className="btn">
                            <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
