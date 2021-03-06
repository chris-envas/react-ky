/**
 * @fileOverview 基本信息
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { createForm } from 'rc-form';
 import classNames from 'classnames';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { GetUserInfo, PostUserInfo, postUploadImg, postUserUpdatePhoto } from '../action/DataAction'

 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
 import '../resources/BasicInfoView.less';

 import Avatar from '../resources/img/avatar-big.png'

 // 字节转成M
 function getfilesize(size) {
     let num = 1024  //byte
     return (size / Math.pow(num, 2)).toFixed(2)
 }
 // 省市区数据
 const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];
 class BasicInfoView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             avatar: Avatar,
             cityAreaData: cityAreaData,
             cityExtra: false,
             cityValue: [],
             addrDetail: '',
             postcode: '',
             wechatNo: '',
             phoneNumber: '',
             email: '',
             userImgPath: Avatar,
             realName: '',
             isEdit: false,  // 是否可编辑
         };
     }
     componentDidMount(){
         let _this = this;
         // 本地缓存没有地址，先获取一次
         if(!cityAreaData.length){
             AddressData(function(e){
                 _this.setState({
                     cityAreaData: e
                 })
             });
         }
         this.props.dispatch(GetUserInfo((res) => {
             this.setState({
                 cityValue: [res.addrPrivonce, res.addrCity, res.addrCounty],
                 addrDetail: res.addrDetail,
                 postcode: res.postcode,
                 wechatNo: res.wechatNo,
                 phoneNumber: res.phoneNumber,
                 email: res.email,
                 realName: res.realName,
                 userImgPath: res.userImgPath,
                 cityExtra: !!res.addrPrivonce
             })
         }))
     }
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 设置state
     stateChangeHandle(name, value){
         this.setState({
             [name]: value
         });
     }
     // 省市区选择
     pickerChangeHandle(v){
        this.setState({
            cityValue: v,
            cityExtra: true
        })
     }
     // 点击获取省市区
     onCitykHandle(){
         const _this = this;
         AddressData(function(e){
             _this.setState({
                 cityAreaData: e
             })
         });
     }
     // 点击编辑
     onEditHandle = () => {
         this.setState({
             isEdit: true
         })
     }
     // 提交
     submitHandle = () => {
         const form = this.props.form;
         form.validateFields((error, value) => {
             if(error){
                 const fieldNames = ['cityValue', 'addrDetail', 'postcode', 'wechatNo', 'phoneNumber', 'email'].reverse();
                 fieldNames.map((item, index) => {
                     if(form.getFieldError(item)){
                         Toast.info(form.getFieldError(item), 1)
                         return;
                     }
                 })
                 return;
             }
             if(!error){
                 this.setState(value)
                 const _state = this.state;
                 const _data = {
                     'addrPrivonce': _state.cityValue[0],
                     'addrCity': _state.cityValue[1],
                     'addrCounty': _state.cityValue[2],
                     'addrDetail': _state.addrDetail,
                     'email': _state.email,
                     'phoneNumber': _state.phoneNumber,
                     'postcode': _state.postcode,
                     'realName': _state.realName,
                     'userImgPath': _state.userImgPath,
                     'wechatNo': _state.wechatNo
                }
                this.props.dispatch(PostUserInfo(_data, (res) => {
                    Toast.success('修改成功！');
                    this.setState({
                        cityValue: [res.addrPrivonce, res.addrCity, res.addrCounty],
                        addrDetail: res.addrDetail,
                        postcode: res.postcode,
                        wechatNo: res.wechatNo,
                        phoneNumber: res.phoneNumber,
                        email: res.email,
                        realName: res.realName,
                        userImgPath: res.userImgPath,
                        isEdit: false
                    })
                }))
             }
         })
     }
     changeUpFile(e) {
         const _this = this;
         var file = e.target.files[0]  // 获取图片资源
         // 只选择图片文件
          if (!file.type.match('image.*')) {
            Toast.info('亲，只能选择图片类型的文件！')
            return false;
          }

          if (getfilesize(file.size) > 10){
            Toast.info('文件过大，请重新选择！')
            return false
          }

          /*
          // http://www.open-open.com/lib/view/open1460474353494.html
          var reader = new FileReader();
          reader.readAsDataURL(file); // 读取文件
          reader.onload = function(arg) {
              _this.setState({
                  avatar: arg.target.result
              })
          }
          */

          let formData = new FormData()
          formData.append('imgFile', file)
          this.props.dispatch(postUploadImg(formData, (res) => {
              const _data = {
                  imgUrl: res.url
              }
              if(res.succeed){
                  // 更新用户头像
                  this.props.dispatch(postUserUpdatePhoto(_data, (userInfo) => {
                      this.setState({
                          userImgPath: userInfo
                      })
                  }))
              }else {
                  Toast.info(res.data.msg)
              }
          }))
     }
     render(){
         const { getFieldDecorator} = this.props.form;

        const basicFormCls = classNames({
            ['m-basic-form']: true,
            ['m-basic-diablad']: !this.state.isEdit
        })
         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.cityExtra
         })
         const _userImg = this.state.userImgPath ?  this.state.userImgPath + '!/fw/500' : Avatar
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable-white">
                     <div className="m-basic">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >基本信息</NavBar>
                         <div className="m-basic-view">
                             <div className="account-info">
                                 <div className="account-thumb">
                                     <label htmlFor="img_input" onChange={this.changeUpFile.bind(this)} id="img_label">
                                         <input id="img_input" type="file" accept="image/*"/>
                                     </label>
                                     <img src={_userImg}/>
                                     <div className="modify">点此修改头像</div>
                                 </div>
                                 <div className="account-name">
                                     <p className="tit">姓名</p>
                                     <p className="name">{this.state.realName}</p>
                                 </div>
                             </div>
                             <div className={basicFormCls}>
                                 {
                                     !this.state.isEdit ? <div className="basic-mask"></div> : null
                                 }
                                 {getFieldDecorator('cityValue',{
                                     initialValue: this.state.cityValue,
                                     rules: [{
                                         required: true,
                                         message: '请选择您所在的省市区'
                                     }],
                                   })(
                                     <Picker
                                         data={this.state.cityAreaData}
                                         title="选择地区"
                                         extra="请选择您所在的省市区"
                                         value={this.state.cityValue}
                                         onChange={this.pickerChangeHandle.bind(this)}
                                         format={(values) => { return values.join(' '); }}
                                      >
                                         <List.Item onClick={this.onCitykHandle.bind(this)} className={cityExtraCls}>所在地</List.Item>
                                     </Picker>
                                 )}

                                 {getFieldDecorator('addrDetail',{
                                     initialValue: this.state.addrDetail,
                                     rules: [{
                                         required: true,
                                         message: '请输入详细地址'
                                     }],
                                   })(
                                     <TextareaItem
                                         title="详细地址"
                                         placeholder="请输入您的详细地址"
                                         labelNumber={5}
                                         autoHeight
                                         value={this.state.addrDetail}
                                         onChange={this.stateChangeHandle.bind(this, 'addrDetail')}
                                     />
                                 )}
                                 {getFieldDecorator('postcode',{
                                     initialValue: this.state.postcode,
                                     rules: [{
                                         pattern: RegxRule.zipCode,
                                         message: '请输入正确的邮政编码'
                                     },{
                                         required: true,
                                         message: '请输入邮政编码'
                                     }],
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         placeholder="请输入6个数字的邮政编码"
                                         maxLength={6}
                                         type="number"
                                         style={{border:'none'}}
                                         onChange={this.stateChangeHandle.bind(this, 'postcode')}
                                     >邮政编码</InputItem>
                                 )}
                                 {getFieldDecorator('wechatNo', {
                                     initialValue: this.state.wechatNo
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         placeholder="请输入您的微信号"
                                         onChange={this.stateChangeHandle.bind(this, 'wechatNo')}
                                     >微信号</InputItem>
                                 )}
                                 {getFieldDecorator('phoneNumber', {
                                     initialValue: this.state.phoneNumber,
                                     rules: [{
                                         pattern: RegxRule.phone,
                                         message: '请输入正确的手机号'
                                     },{
                                         required: true,
                                         message: '请输入您的手机号'
                                     }],
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         type="number"
                                         placeholder="请输入您的手机号"
                                         onChange={this.stateChangeHandle.bind(this, 'phoneNumber')}
                                         maxLength={11}
                                     >手机号</InputItem>
                                 )}
                                 {getFieldDecorator('email', {
                                     initialValue: this.state.email,
                                     rules: [{
                                       type: 'email', message: '请输入正确的邮箱地址',
                                     }, {
                                       required: true, message: '请输入邮箱地址',
                                     }],
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         placeholder="请输入邮箱地址"
                                         onChange={this.stateChangeHandle.bind(this, 'email')}
                                     >邮箱地址</InputItem>
                                 )}
                             </div>
                             {
                                 !this.state.isEdit ? <div className="basic-edit">
                                     <span className="edit-btn" onClick={this.onEditHandle}>编辑</span>
                                 </div> : ''
                             }

                         </div>
                     </div>
                 </div>
                 {
                     this.state.isEdit ? <div className="m-foot-fixed">
                         <Button title="提交" type="submit" onClick={this.submitHandle} across/>
                     </div> : ''
                 }
             </div>
         );
     }
 }

 const BasicInfoViewWrapper = createForm()(BasicInfoView);

 /*  React 与  Redux 绑定 */
 function mapStateToProps(state){
     return {
     };
 }

 export default connect(
     mapStateToProps
 )(BasicInfoViewWrapper);
