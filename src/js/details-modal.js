import Raty from 'raty-js';
import 'raty-js/src/raty.css';

import { refs } from './refs';

export function initColorMarkers() {
  const colorInputs = document.querySelectorAll('.color-checkbox-input');
  if (colorInputs.length > 0) {
    colorInputs[0].checked = true;
  }
}

export function renderModalContent(product) {
  const {
    _id,
    images,
    name,
    category: { name: categoryName },
    price,
    rate,
    color,
    description,
    sizes,
  } = product;

  const colorListMarkup = color
    .map(
      (hex, index) => `
              <li class="color-checkbox-item">
                <label class="color-checkbox-label">
                  <input
                    type="radio"
                    name="color"
                    value="${hex}"
                    class="color-checkbox-input"
                    ${index === 0 ? 'checked' : ''}
                  />
        <span class="color-checkbox-marker" style="background-color: ${hex};
border: ${
        hex.toLowerCase() === '#ffffff' ? '1px solid #e1e1e1' : 'none'
      };"></span>
                </label>
              </li>`
    )
    .join('');

  const markup = `
    <div class="product-modal" data-id="${_id}">
      <div class="product-gallery">
        <img src="${images[0]}" class="main-img" alt="Product image" />
        <div class="thumb-list">
          <img src="${images[1]}" class="thumb" alt="Preview image" />
          <img src="${images[2]}" class="thumb" alt="Preview image" />
        </div>
      </div>

      <div class="product-info">
        <h2 class="product-title">${name}</h2>
        <p class="category">${categoryName}</p>
        <p class="price">${price} грн</p>
        <div class="rating-wrapper">
          <div class="stars-container" data-raty data-score="${rate}">
            </div>
          </div>
         <div class="product-colors">
            <p class="label">Колір</p>
            <ul class="color-checkbox-list">${colorListMarkup}</ul>
              </div>
              <div class="description">
            <p class="description-text">${description}</p>
            <p class="sizes">Розміри: ${sizes}</p>
          </div>
          <button class="order-btn" data-id="${_id}">
            Перейти до замовлення
          </button>
          </div>
        </div>
      </div>`;

  refs.modalContainer.innerHTML = markup;

  initRatings();
}

export function initRatings() {
  const elements = document.querySelectorAll('[data-raty]');

  elements.forEach(el => {
    if (el.children.length > 0) return;

    const score = el.dataset.score || 0;

    const raty = new Raty(el, {
      score: score,
      readOnly: true,
      half: true,
      starType: 'i',
    });

    raty.init();
  });
}

export function closeModal(e) {
  if (e.target.classList.contains('backdrop')) {
    hideModal();
    document.removeEventListener('keydown', closeModalEsc);
    refs.modalContainer.innerHTML = '';
  }
}

export function closeModalBtn() {
  hideModal();
  document.removeEventListener('keydown', closeModalEsc);
  refs.modalContainer.innerHTML = '';
}
export function closeModalEsc(e) {
  if (e.key === 'Escape') {
    hideModal();
    document.removeEventListener('keydown', closeModalEsc);
    refs.modalContainer.innerHTML = '';
  }
}

export function showModal() {
  refs.backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function hideModal() {
  refs.backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}
