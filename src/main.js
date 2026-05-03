import './js/header.js';
import {
  initHomePage,
  handleLoadMore,
  handlerByCategories,
  handlerModal,
} from './js/handlers';
import { initFaq } from './js/faq';
import './css/faq.css';
import { refs } from './js/refs';
import './js/footer.js';
import { closeModal, closeModalBtn } from './js/details-modal.js';
import {
  closeOrderForm,
  closeOrderFormBtn,
  handlerOrderForm,
  onOrderBtnClick,
} from './js/order-modal.js';
import { initFeedbackSection } from './js/feedback.js';
import { closeThanksForm, closeThanksFormBtn } from './js/thanks-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
  initFaq();
  initFeedbackSection();
});

refs.categories.addEventListener('click', handlerByCategories);

refs.loadMoreBtn.addEventListener('click', handleLoadMore);

refs.furnitureList.addEventListener('click', handlerModal);

refs.modalContainer.addEventListener('click', onOrderBtnClick);

refs.productModal.addEventListener('click', closeModal);

refs.modalCloseBtn.addEventListener('click', closeModalBtn);

refs.orderCloseBtn.addEventListener('click', closeOrderFormBtn);

refs.orderModal.addEventListener('click', closeOrderForm);

refs.orderForm.addEventListener('submit', handlerOrderForm);

refs.thanksCloseCross.addEventListener('click', closeThanksFormBtn);

refs.thanksCloseBtn.addEventListener('click', closeThanksFormBtn);

refs.thanksModal.addEventListener('click', closeThanksForm);
