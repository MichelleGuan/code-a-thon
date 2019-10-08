import template from './index.html'
import './style.scss'
import fullpage from 'fullpage.js'


export default class {
  mount(container) {
    document.title = 'fullPage'
    container.innerHTML = template
    new fullpage('#fullpage', {
      sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey'],
      scrollingSpeed: 900,
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutBounce',
      easingcss3: 'cubic-bezier(0.25,0.1,0.25,1)'
    })
  }
}
