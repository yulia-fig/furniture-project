import axios from 'axios';
import { refs } from './refs';
import { hideLoader, showLoader, showToast } from './helpers';
import { hideModal } from './details-modal';
import { closeThanksModalEsc, openThanksForm } from './thanks-modal';

export function onOrderBtnClick(e) {
  const orderBtn = e.target.closest('.order-btn');
  if (!orderBtn) return;
  const productId = orderBtn.getAttribute('data-id');

  document.querySelector('#product-id').value = productId;

  const selectedColor = document.querySelector(
    'input[name="color"]:checked'
  )?.value;
  document.querySelector('#product-color').value = selectedColor;

  hideModal();
  openOrderForm();

  document.addEventListener('keydown', closeOrderModalEsc);
}

function openOrderForm() {
  refs.orderModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeOrderForm(e) {
  if (e.target.classList.contains('backdrop')) {
    refs.orderModal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeOrderModalEsc);
  }
}

export function closeOrderFormBtn() {
  refs.orderModal.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeOrderModalEsc);
}

function closeOrderModalEsc(e) {
  if (e.key === 'Escape') {
    refs.orderModal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeOrderModalEsc);
  }
}

export async function handlerOrderForm(e) {
  e.preventDefault();
  const { name, phone, productId, color } = e.target.elements;
  const formData = {
    name: name.value,
    phone: phone.value,
    modelId: productId.value,
    color: color.value,
  };
  showLoader();
  try {
    const res = await axios.post('/orders', formData);
    const orderData = res.data;
  } catch (error) {
    showToast(
      'Щось пішло не так. Спробуйте ще раз пізніше, будь ласка.',
      'error'
    );
  } finally {
    refs.orderModal.classList.remove('is-open');
    document.body.style.overflow = '';
    openThanksForm();
    e.target.reset();
    hideLoader();
    document.addEventListener('keydown', closeThanksModalEsc);
  }
}
