# ajax请求
zepto
```js
import Base64 from 'js-base64';
const kyaniSecurity = Base64.Base64.encode('kyani-shop' + ':' + 'security');

$.ajax({
    type: 'POST',
    url: 'http://10.206.41.67:8012/oauth/token',
    data: {
        grant_type : 'password',
        username :'2771081C',
        password : 'Ky5513687',
        scope : 'read write'
    },
    headers: {
        Authorization: 'Basic ' + kyaniSecurity,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}, function(res){
    console.log(res)
})
```
axios
```js
const kyaniSecurity = Base64.Base64.encode('kyani-shop' + ':' + 'security');
axios.defaults.headers.common['Authorization'] = 'Basic ' + kyaniSecurity;
// axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const response = post('http://10.206.41.67:8012/oauth/token', qs.stringify({
    grant_type : 'password',
    username :'2771081C',
    password : 'Ky5513687',
    scope : 'read write'
}));
response.then(function(res){
    axios.get('http://10.206.41.67:8012/test/test',{
        headers: {
            Authorization: "Bearer "+ res.data.access_token
        }
    }).then(function(obj){

    })
})
```

```js
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

async function getAdd(){
    try{
        const response = await getPublic(Urls.Address);
        await response;
        if(response.data.success){
            console.log('response.data.data', response.data.data)
            return response.data.data;
        }
    }catch(err){
        console.log(err);
    }
}
getAdd();
```

统一处理错误：https://github.com/youngwind/blog/issues/67
