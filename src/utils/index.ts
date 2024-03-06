import pagesJson from '@/pages.json'
import { translate as t } from '@/locale/index'

console.log(pagesJson)

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!Object.keys(pagesJson).includes('tabBar')) {
    return false
  }
  const pages = getCurrentPages()
  const currPath = pages.at(-1).route
  return !!pagesJson.tabBar.list.find((e) => e.pagePath === currPath)
}

/**
 * test i18n in not .vue file
 */
export const testI18n = () => {
  console.log(t('app.name'))
  // 下面同样生效
  uni.showModal({
    title: 'i18n 测试',
    content: t('app.name'),
  })
}
/**
 * 获取当前页面路由的 path 路劲和 redirectPath 路径
 * path 如 ‘/pages/login/index’
 * redirectPath 如 ‘/pages/demo/base/route-interceptor’
 */
export const currRoute = () => {
  const pages = getCurrentPages()
  const currRoute = (pages.at(-1) as any).$page
  // console.log(currRoute)
  const { fullPath } = currRoute as { fullPath: string }
  // console.log(fullPath) // eg: /pages/login/index?redirect=/pages/demo/base/route-interceptor
  const [path, query] = fullPath.split('?')
  // console.log(path, query) // /pages/login/index redirect=/pages/demo/base/route-interceptor
  // TODO: 根据业务，可能需要调整代码逻辑
  const redirectPath = query.split('redirect=')[1] // /pages/demo/base/route-interceptor
  return { path, redirectPath }
}
