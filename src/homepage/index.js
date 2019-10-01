import template from './index.html'
import router from '../router'
import './style.scss'

export default class {
    mount(container) {
        document.title = 'homepage'
        container.innerHTML = template
        container.querySelector('.d3_demo1').addEventListener('click', () => {
            router.go('/d3demo1')
        })
        container.querySelector('.d3_demo2').addEventListener('click', () => {
            router.go('/d3demo2')
        })
        container.querySelector('.d3_demo3').addEventListener('click', () => {
            router.go('/d3demo3')
        })
    }
}