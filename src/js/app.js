import AddImg from './AddImg.js';

const blockImg = document.getElementsByClassName('block-img')[0];
const elementError = document.getElementById('error-url');

const buttonSelectFile = document.querySelector('#button-select');
const elSelectFile = document.querySelector('#drop-file');

const addImg = new AddImg(blockImg, elementError);

function loadFile(files) {
  for (const item of files) {
    const urlImg = URL.createObjectURL(item);
    addImg.createImg('nameImg', urlImg);
    buttonSelectFile.addEventListener('load', () => {
      URL.revokeObjectURL(urlImg);
    });
  }
}

elSelectFile.addEventListener('click', () => {
  buttonSelectFile.value = null;
  buttonSelectFile.dispatchEvent(new MouseEvent('click'));
});

elSelectFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

elSelectFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  loadFile(files);
});

buttonSelectFile.addEventListener('input', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files);
});

blockImg.addEventListener('click', (event) => {
  if (event.target.className === 'close') {
    const itemElemnt = event.target.closest('.item-img-div');
    blockImg.removeChild(itemElemnt);
  }
});