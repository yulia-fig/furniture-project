import {
  getCategories,
  getProductInModal,
  getProducts,
  getProductsByCategory,
} from './categories-api';
import { renderCategories, renderFurniture } from './categories-render';
import {
  closeModalEsc,
  initColorMarkers,
  renderModalContent,
  showModal,
} from './details-modal';
import {
  hideLoader,
  hideLoadMoreBtn,
  showLoader,
  showLoadMoreBtn,
  showToast,
} from './helpers';
import { refs } from './refs';

let page;
let currentCategory = 'all';
let totalPages;

function toggleLoadMoreBtn() {
  if (page >= totalPages) {
    hideLoadMoreBtn();
    showToast('Вибачте, більше результатів немає', 'warning');
  } else {
    showLoadMoreBtn();
  }
}

export async function initHomePage() {
  page = 1;
  try {
    showLoader();
    const categories = await getCategories();
    renderCategories(categories);
    const { furnitures, totalItems } = await getProducts(page);
    totalPages = Math.ceil(totalItems / 8);
    renderFurniture(furnitures);
    toggleLoadMoreBtn();
    showToast('Меблі успішно завантажено!');
  } catch (error) {
    showToast('Щось пішло не так. Спробуйте ще раз пізніше, будь ласка.', 'error');
  } finally {
    hideLoader();
  }
}

export async function handlerByCategories(e) {
  const btn = e.target.closest('.category-btn');
  if (!btn) return;

  page = 1;
  currentCategory = btn.dataset.id;

  try {
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    refs.furnitureList.innerHTML = '';

    let data;
    showLoader();

    if (currentCategory === 'all') {
      data = await getProducts(page);
    } else {
      data = await getProductsByCategory(currentCategory, page);
    }

    const { furnitures, totalItems } = data;

    totalPages = Math.ceil(totalItems / 8);

    renderFurniture(furnitures);

    toggleLoadMoreBtn();
    showToast('Меблі успішно завантажено!');
  } catch (error) {
    showToast('Щось пішло не так. Спробуйте ще раз, будь ласка.', 'error');
  } finally {
    hideLoader();
  }
}

export async function handleLoadMore() {
  page += 1;

  try {
    let data;
    showLoader();

    if (currentCategory === 'all') {
      data = await getProducts(page);
    } else {
      data = await getProductsByCategory(currentCategory, page);
    }

    const { furnitures } = data;

    renderFurniture(furnitures);

    toggleLoadMoreBtn();
    showToast('Меблі успішно завантажено!');
  } catch (error) {
    showToast('Щось пішло не так. Спробуйте ще раз, будь ласка.', 'error');
  } finally {
    hideLoader();
  }
}

export async function handlerModal(e) {
  const id = e.target.closest('li').dataset.id;

  try {
    showLoader();
    const modal = await getProductInModal(id);
    showModal();
    renderModalContent(modal);
    initColorMarkers();
    document.addEventListener('keydown', closeModalEsc);
  } catch (error) {
    showToast('Щось пішло не так. Спробуйте ще раз, будь ласка.', 'error');
  } finally {
    hideLoader();
  }
}
