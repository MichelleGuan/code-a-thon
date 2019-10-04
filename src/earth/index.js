import template from './index.html';
import './style.scss';


export default class {
  mount(container) {
    document.title = 'earth'
    container.innerHTML = template
  }
}