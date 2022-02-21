const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
  try {
    const response = await fetch(url, {method:'GET', headers:{'x-api-key':'50babd3c-b978-4e71-92f0-5975f8bfe144'}});

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw {
      message: error.message,
      status: error.status
    }
  }
}

const api = {
  fetchRandomCatImgs: async (page) => {
    try {
      const catData = await request(`${API_ENDPOINT}/images/search?limit=12&page=${page}&order=DESC`);
      showCatData(randomCatList, catData);
    } catch (error) {
      console.log(error)
    }
  }
}

const catsList = document.querySelector('.cat-list');
const randomCatList = document.querySelector('.random-cat-list');
const previous = document.querySelector('.previous');
const showCatData = (catsList, cats) => {
  cats.map(cat => {
    const catItem = document.createElement('li');
    const catImage = document.createElement('img');
    const catId = document.createElement('p');

    catImage.setAttribute('src', cat.url);
    catImage.classList.add('lazy');
    catImage.dataset.src = cat.url;
    catImage.dataset.id = cat.id;

    catItem.className = 'cat-item';
    catItem.appendChild(catImage);
    catItem.appendChild(catId);

    catsList.appendChild(catItem);
  })

  catsList.addEventListener('click', e => {
    const path = e.path;
    const catObj = path.find(elem => elem.className === 'cat-item');
    
    if (catObj) {
      const clickedCatImageInfo = catObj.querySelector('img');
      toggleModal();
      showModal(
        clickedCatImageInfo.getAttribute('data-src'),
        clickedCatImageInfo.getAttribute('data-id')
      );
    }
  })
}

// Create a modal box
const modalWrapper = document.querySelector('.modal-wrapper');
modalWrapper.classList.add('hidden');
const showModal = (url, id) => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const modalContents = document.createElement('section');
  modalContents.className = 'modal-contents';

  const modalHeader = document.createElement('header');

  const modalTitle = document.createElement('div');
  modalTitle.className = 'modal-title';
  modalTitle.innerText = 'Cat Modal';

  const catImage = document.createElement('img');
  catImage.setAttribute('src', url);

  modalContents.appendChild(modalHeader);
  modalContents.appendChild(catImage);
  modalContents.appendChild(catId);

  modalWrapper.appendChild(overlay);
  modalWrapper.appendChild(modalContents);
}

const getRandomCatsButton = document.querySelector('.get-random-cats');
let pageNumber = document.querySelector('.page-number');
let page = 0

document.addEventListener("DOMContentLoaded", () => {
  console.log('here',pageNumber,page )

    randomCatList.innerHTML = '';
    api.fetchRandomCatImgs(page);
  })

getRandomCatsButton.addEventListener('click', () => {
  randomCatList.innerHTML = '';
  pageNumber.innerHTML ++;
  page ++
  api.fetchRandomCatImgs(page);
})

const previousButton = document.querySelector('.previous');
previousButton.addEventListener('click', () => {
  if(page > 0){
    pageNumber.innerHTML --;
    randomCatList.innerHTML = '';
    page --
    api.fetchRandomCatImgs(page);
  }
})

const spinnerWrapper = document.querySelector('.spinner-wrapper');
spinnerWrapper.classList.add('hidden');

const overlay = document.createElement('div');
overlay.className = 'overlay';

const spinnerContents = document.createElement('div');
spinnerContents.className = 'spinner-contents';

const spinnerImage = document.createElement('img');
spinnerImage.className = 'spinner-image';
spinnerImage.setAttribute('src', './images/cat.png');

spinnerContents.appendChild(spinnerImage);
spinnerWrapper.appendChild(overlay);
spinnerWrapper.appendChild(spinnerContents);

const prev = {
  fetchRandomCatImgs: async () => {
    try {
      showCatData(randomCatList, catData);
    } catch (error) {
      console.log(error)
    }
  }
}