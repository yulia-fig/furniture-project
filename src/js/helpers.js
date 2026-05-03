import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showLoader() {
  refs.loader.classList.remove('hidden');
  refs.submitBtn.disabled = true;
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
  refs.submitBtn.disabled = false;
}

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'bottomRight',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: `Invalid type of toast: ${type}`,
        position: 'topRight',
        timeout: 5000,
      });
      break;
  }
}
