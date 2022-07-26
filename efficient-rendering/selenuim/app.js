const render = require('./lib/render')
const log = require('./util/log.js')
const http = require('http')
async function safeExit() {
  const driver = render.driver
  await driver.close()
  await driver.quit()
  process.exit(0)
}

async function runLoop(data) {
  // 本地测试demo,本地开发，所以就省略消息推送的代码了
  await render.print({ url:data.url }, async (res) => {
    if (res.success) {
      log.info('任务Id:' + renderId + ' 图片生成成功')
    }
  })
}

process.on('uncaughtException', function (err) {
  log.error('An uncaught error occurred!')
  log.error(err)
  safeExit()
})


http.createServer((req, res) => {
  if (req.url !== '/favicon.ico' ||  req.url !==  '/') {
    let allData = ''
    req.on('data', (data) => {
      allData += decodeURIComponent(data)
    })
    req.on('end', () => {
      allData = JSON.parse(allData)
      runLoop(allData)
    })
  }
  res.end()
}).listen(3003, 'localhost')

