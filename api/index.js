export default ($axios) => {
  // https://www.mrcdh.cn/pages/a7f719/#%E5%88%9B%E5%BB%BAapi%E6%A8%A1%E5%9D%97
  const modulesFiles = require.context('./apilist', true, /\.js$/)
  const modules = modulesFiles.keys().reduce((module, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    module[moduleName] = value.default($axios)
    return module
  }, {})
  return modules
}
