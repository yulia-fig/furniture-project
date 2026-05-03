import { refs } from './refs';

export function openThanksForm() {
  refs.thanksModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeThanksForm(e) {
  if (e.target === refs.thanksModal) {
    refs.thanksModal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeThanksModalEsc);
  }
}

export function closeThanksFormBtn() {
  refs.thanksModal.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeThanksModalEsc);
}

export function closeThanksModalEsc(e) {
  if (e.key === 'Escape') {
    refs.thanksModal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeThanksModalEsc);
  }
}
