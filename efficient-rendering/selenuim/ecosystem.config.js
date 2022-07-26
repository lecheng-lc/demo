module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'render',
      script: './app.js',
      instances: 1,
      max_memory_restart: '500M',
      exec_mode: 'fork',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_dev: {
        NODE_ENV: 'production',
        APP_ENV: 'development'
      },
      env_test: {
        NODE_ENV: 'production',
        APP_ENV: 'test'
      },
      env_production: {
        NODE_ENV: 'production',
        APP_ENV: 'production'
      },
      log_date_format : "YYYY-MM-DD HH:mm:ss"
    }
  ]
}
