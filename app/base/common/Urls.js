/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  //登录
    User: profile.server + '/starspower/shop/service/v1/user',           //POST 注册消费者, GET 获取当前登录会员的消息
    UserExist: profile.server + '/starspower/shop/service/v1/user/exist',//据用户帐号检查用户是否存在，如CN123456
    Address: profile.server + '/starspower/shop/service/v1/address',      //获取所有地址数据
};

export default Urls;
