const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const io = require('selenium-webdriver/io')

const CHROMEDRIVER_EXE = process.platform === 'win32' ? 'lib/chromedriver.exe' : (process.platform === 'darwin' ? 'lib/chromedriver_mac' : 'lib/chromedriver_linux')
class Render {
  constructor () {
    this._driver = null
    this.failedResult = { success: false, message: '生成失败'}
    this.running = false
  }
  // 初始化驱动
  get driver () {
    if (!this._driver) {
      const service = new chrome.ServiceBuilder(io.findInPath(CHROMEDRIVER_EXE, true))
      this._driver = new webdriver.Builder()
      .setChromeService(service)
      .forBrowser('chrome')
      .build()
    }
    return this._driver
  }

  set driver (value) {
    this._driver = value
  }
  // 执行渲染任务
  async runTask (params, callback) {
    this.running = true
    const driver = this.driver
    await driver.get(params.url)
    await callback({ success: true, message: '生成成功'})
    this.running = false
  }
  print (options, callback) {
    return this.runTask(options, callback)
  }
}

module.exports = new Render()
