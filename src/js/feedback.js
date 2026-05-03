import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Raty from 'raty-js';
import 'raty-js/src/raty.css';
import { refs } from './refs';

const API_URL = 'https://furniture-store-v2.b.goit.study/api/feedbacks?page=1&limit=10';

let feedbackSwiper;

export async function initFeedbackSection() {
  showLoader();

  try {
    const feedbacks = await getFeedbacks();

    if (!feedbacks.length) {
      throw new Error('No feedbacks available');
    }

    refs.list.innerHTML = createFeedbackMarkup(feedbacks);
    refs.readyState.classList.remove('hidden');
    initRatings();
    initSwiper(feedbacks.length);
  } catch (error) {
    showErrorToast();
  } finally {
    hideLoader();
  }
}

async function getFeedbacks() {
  const { data } = await axios.get(API_URL);

  const feedbacks = Array.isArray(data?.feedbacks)
    ? data.feedbacks
    : Array.isArray(data)
      ? data
      : [];

  return feedbacks.slice(0, 10);
}

function initSwiper(slidesCount) {
  feedbackSwiper = new Swiper('[data-feedback-swiper]', {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 500,
    grabCursor: true,
    allowTouchMove: slidesCount > 1,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      prevEl: refs.prevBtn,
      nextEl: refs.nextBtn,
      disabledClass: 'is-disabled',
    },
    pagination: {
      el: refs.pagination,
      clickable: true,
      bulletElement: 'button',
      renderBullet(index, className) {
        return `<button class="${className}" type="button" aria-label="Перейти до відгуку ${index + 1}"></button>`;
      },
    },
    on: {
      afterInit(swiper) {
        syncNavState(swiper);
      },
      slideChange(swiper) {
        syncNavState(swiper);
      },
      resize(swiper) {
        syncNavState(swiper);
      },
    },
  });
}

function syncNavState(swiper) {
  refs.prevBtn.disabled = swiper.isBeginning;
  refs.nextBtn.disabled = swiper.isEnd;
}

function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map((feedback, index) => {
      const author = feedback?.name ?? feedback?.author ?? 'Anonymous';
      const reviewText =
        feedback?.descr ??
        feedback?.description ??
        feedback?.review ??
        'Клієнт поділився позитивним враженням про співпрацю з нами.';
      const roundedRating = normalizeRating(Number(feedback?.rate ?? feedback?.rating ?? 0));

      return `
        <li class="swiper-slide feedback__item">
          <article class="feedback__card">
            <div class="feedback__rating-row">
              <div
                class="feedback__stars"
                data-feedback-rating
                data-feedback-score="${roundedRating}"
                aria-label="Оцінка ${roundedRating} з 5"
              ></div>
              <span class="feedback__score">${formatRating(roundedRating)}</span>
            </div>

            <p class="feedback__text">“${escapeHtml(reviewText)}”</p>

            <div class="feedback__author">
              <p class="feedback__author-name">${escapeHtml(author)}</p>
            </div>
          </article>
        </li>
      `;
    })
    .join('');
}

function initRatings() {
  const ratingElements = document.querySelectorAll('[data-feedback-rating]');

  ratingElements.forEach(element => {
    const score = Number(element.dataset.feedbackScore);

    new Raty(element, {
      readOnly: true,
      score,
      half: true,
      halfShow: true,
      starType: 'i',
      number: 5,
      hints: Array(5).fill(''),
      space: true,
    }).init();
  });
}

function normalizeRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) {
    return 3.5;
  }

  if (rating >= 3.8 && rating <= 4.2) {
    return 4;
  }

  const rounded = Math.round(rating * 2) / 2;
  return Math.max(0, Math.min(5, rounded));
}

function formatRating(rating) {
  return Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function showLoader() {
  refs.loaderFeedback.classList.remove('hidden');
  refs.readyState.classList.add('hidden');
}

function hideLoader() {
  refs.loaderFeedback.classList.add('hidden');
}

function showErrorToast() {
  iziToast.error({
    title: 'Помилка',
    message: 'Не вдалося завантажити відгуки. Спробуйте ще раз трохи пізніше.',
    position: 'bottomRight',
    timeout: 5000,
  });
}
