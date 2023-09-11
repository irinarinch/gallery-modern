import Image from './Image';

export default class ImageList {
  constructor() {
    this.array = [];
  }

  addImage(name, url) {
    if (name === '') {
      throw new Error('Invalid name');
    } else {
      const newImage = new Image(name, url);
      this.array.push(newImage);

      return newImage;
    }
  }

  find(name) {
    return this.array.find((el) => el.name.toLowerCase() === name.toLowerCase());
  }

  removeImage(image) {
    this.array.splice(this.array.indexOf(image), 1);
  }
}
