### 优势
- 隔离性能好包括，完美的css隔离，完美js隔离
- 非常简单，使用没有任何心智负担。
- 多应用激活，页面上可以摆放多个iframe来组合业务

### 劣势
- 页面加载问题: 影响主页面加载，阻塞onload事件，本身加载也很慢，
- dom 割裂严重，弹窗只能在 iframe 内部展示，无法覆盖全局。布局问题，iframe标签无法自动撑开
- 路由状态丢失，刷新一下，iframe 的 url 状态就丢失了。
- iframe样式不容易更改，跨域的情况下只能通过postmesssage和window.addEventListenner('message',cb())
- 子应用需要和基座共享cookie的话，条件还是比较苛刻的，需要主域名一致
- 白屏时间太长，对于SPA 应用应用来说无法接受。


> 以上问题大部分均可在demo中找到