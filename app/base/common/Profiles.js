/**
 * @fileOverview 定义api访问域名
 */
const profiles = {
    local: {
        preffix: '',
        host: '365e43.natappfree.cc',
        // host : '10.206.40.145:8012',
        sercureEnable: false
    },
    prod: {
        preffix: '',
        host: '127.0.0.1:8012',
        // host: 'dev.kyani.cn:8100',
        //sercureEnable: true
        sercureEnable: false
    }
};

const currentProKey = __environment__;

const profile = profiles[currentProKey];

profile.server = 'http://' + profile.host + profile.preffix;

if(profile.sercureEnable){
    profile.server = 'https://' + profile.host + profile.preffix;
}else{
    profile.server = 'http://' + profile.host + profile.preffix;
}

export default profile;
