/**
 * @fileOverview 管理收货地址
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import classNames from 'classnames';

 //组件
 import { Button, Toast, NavBar, Modal, Result} from 'uxComponent';
 import '../resources/AddressView.less';

 class AddressView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             addressData: [
                 {
                     addressId: '1',
                     userName: 'Benson',
                     iphone: '13503077896',
                     idCard: '44088218272615',
                     streetName: '广州市天河区sadflsadflj',
                     isDefault: true
                 },
                 {
                     addressId: '2',
                     userName: 'Benson',
                     iphone: '13503077896',
                     idCard: '44088218272615',
                     streetName: '广州市天河区耀中广场918号',
                     isDefault: false
                 },
                 {
                     addressId: '3',
                     userName: '李先生',
                     iphone: '1360307436',
                     idCard: '44076543456787654345',
                     streetName: '棋顶起仍枯做朋友有理脾工90892号',
                     isDefault: false
                 }
             ]
         };
     }
     componentDidMount(){}
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 设为默认地址
     radioChange(addressId){
         this.state.addressData.forEach((address, index) => {
             if(address.addressId === addressId) {
                 address.isDefault = true;
                 this.setState({
                     random: Math.random()
                 });
             } else {
                 address.isDefault = false;
                 this.setState({
                     random: Math.random()
                 });
             }
         });
     }
     // 删除
     onDeleteHandle(index){
         this.state.addressData.splice(index, 1);
         this.setState({
             random: Math.random()
         });
     }
     render(){
         console.log(this.state)
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-address">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >管理收货地址</NavBar>
                         <div className="m-address-view">
                             {
                                 this.state.addressData.map((item, index) => {
                                     const addressCls = classNames({
                                         [`address-item`]: true,
                                         [`address-item-active`]: item.isDefault
                                     })
                                     const iconCls = classNames({
                                         [`icon`]: true,
                                         [`icon-radio`]: !item.isDefault,
                                         [`icon-selectFill`]: item.isDefault
                                     })
                                     return (
                                         <div className={addressCls}>
                                             <div className="address-border"></div>
                                             <div className="address-body">
                                                 <div className="item">
                                                     <div className="name">收货人</div>
                                                     <div className="info">{item.userName}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">手机号</div>
                                                     <div className="info">{item.iphone}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">身份证号码</div>
                                                     <div className="info">{item.idCard}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">收货地址</div>
                                                     <div className="info">{item.streetName}</div>
                                                 </div>
                                             </div>
                                             <div className="address-foot">
                                                <div className="select">
                                                    <label>
                                                        <div className="select-radio">
                                                            <input type="radio" value={item.isDefault} checked={item.isDefault} onChange={this.radioChange.bind(this, item.addressId)}/>
                                                            <i className={iconCls}></i>
                                                      </div>
                                                      <span className="name">{item.isDefault ? '默认地址' : '设为默认'}</span>
                                                  </label>
                                                </div>
                                                <div className="edit-btn">
                                                    <a href="javascript:;" className="btn">编辑</a>
                                                    <a href="javascript:;"
                                                        onClick={() => Modal.alert('删除', '确定删除么?', [
                                                          { text: '取消'},
                                                          { text: '确定', onPress: this.onDeleteHandle.bind(this, index) },
                                                        ])}
                                                        className="btn">删除</a>
                                                </div>
                                             </div>
                                         </div>
                                     );
                                 })
                             }
                         </div>
                         {
                             this.state.addressData.length <= 0 ? <div className="loading-container">
                                 <Result
                                    img={<i className="icon icon-paymentDone"></i>}
                                    message="您还没有添加收货地址哦，赶紧添加一个吧"
                                  />
                              </div>
                             : null
                         }
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                     <Button title="新增收货地址" type="submit" onClick={this.submitHandle} across/>
                 </div>
             </div>
         );
     }
 }

 export default AddressView;
