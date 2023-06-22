import swal from 'sweetalert';
import Element from './Element';

export default class Widget {
  constructor(list) {
    this.list = list;
    this.nameInput = document.querySelector('.name');
    this.urlInput = document.querySelector('.url');
    this.form = document.querySelector('.form');
    this.container = document.querySelector('.images-container');
    this.message = document.querySelector('.error-message');
  }

  init() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.removeElement = this.removeElement.bind(this);

    this.form.addEventListener('submit', this.onSubmit);
    this.urlInput.addEventListener('input', this.onInput);
  }

  onInput() {
    this.message.classList.add('hidden');
  }

  onSubmit(e) {
    e.preventDefault();

    try {
      this.addElement();
    } catch (error) {
      if (error.message === 'Invalid name') {
        swal('Введите название изображения');
      } else {
        swal('Изображение с таким названием уже есть');
      }
    }
  }

  addElement() {
    const name = this.nameInput.value.trim();
    const url = this.urlInput.value.trim();

    const listItem = this.list.addImage(name, url);
    const element = new Element();
    const img = element.create(listItem.url, listItem.name);

    img.onload = () => {
      element.render(this.container);
      this.message.classList.add('hidden');
      this.form.reset();

      element.remover.addEventListener('click', this.removeElement);
    };

    img.onerror = () => {
      this.message.classList.remove('hidden');
      this.list.removeImage(listItem);
    };
  }

  removeElement(e) {
    const target = e.target.closest('.box');
    const elementName = target.querySelector('figcaption').textContent;
    const targetImage = this.list.find(elementName);

    this.container.removeChild(target);
    this.list.removeImage(targetImage);
  }
}
