import d3_demo1 from './d3_demo1'
import d3_demo2 from './d3_demo2'
import d3_demo3 from './d3_demo3'
import homepage from './homepage'
import earth from './earth'

const routes = {
  '/d3demo1': d3_demo1,
  '/d3demo2': d3_demo2,
  '/d3demo3': d3_demo3,
  '/earth': earth,
  '/homepage': homepage
}

class Router {
  start() {
    window.addEventListener('popstate', () => {
      this.load(location.pathname)
    })
    this.load(location.pathname)
  }

  go(path) {
    history.pushState({}, '', path)
    this.load(path)
  }

  load(path) {
    if (path === '/') {
        path = '/homepage'
    }
    let view = new routes[path]()
    view.mount(document.body)
  }
}

export default new Router()