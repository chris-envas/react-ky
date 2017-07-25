# Result 结果页
在整张页面中组织插画、图标、文字等内容，向用户反馈操作结果。

### 规则
- 用作非常重要的操作反馈，eg：支付成功，无网络状态。
- 个性化且优美的插画，可以提升品牌形象。
- 对于错误类型的结果页，页面中需要提供明确的行动点，eg：重新加载。

## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| imgUrl    | 插图 url    | string / Image Source(rn)  |  -  |
| img   | 插图元素 (可以为`<img src="" />`/`<i className="icon icon-paymentDone"></i>`等), 会覆盖 imgUrl 设置  | React.Element | -  |
| title    |    title 文案     | String/React.Element |  -  |
| message    |    message 文案     | String/React.Element |  -  |
| buttonText    |    按钮文案     | string |  -  |
| buttonType    |    请参考 button 的配置    | string |  -  |
| buttonClick    |    按钮回调函数     | (e: Object): void |  -  |


## 示例：
```js
<Result
   img={<i className="icon icon-paymentDone"></i>}
   message="您还没有添加地址哦，赶紧添加一个吧"
   buttonText="赶紧添加一个吧"
   buttonType="submit"
 />
```
