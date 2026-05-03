const header = document.querySelector('.header-mobile-menu');
const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-btn');
const headerCloseMobile = document.querySelector('.header-list-row');
const headerShadov = document.querySelector('.header-darkness');

const toggleMenu = async () => {
  await new Promise(resolve => requestAnimationFrame(resolve));
  headerShadov.classList.toggle('is-open');
  header.classList.toggle('is-open');
  burgerBtn.classList.toggle('header-burger-hidann');
  closeBtn.classList.toggle('header-burger-hidann');
};

burgerBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
for (const item of headerCloseMobile.children) {
  const link = item.querySelector('a');
  if (link) link.addEventListener('click', toggleMenu);
}
headerShadov.addEventListener('click', (e) => {
  e.stopPropagation();
  for (let i = 0; i < document.querySelectorAll('.is-open').length; ) {
      document.querySelectorAll('.is-open')[i].classList.remove('is-open');
    }
    burgerBtn.classList.remove('header-burger-hidann');
    closeBtn.classList.add('header-burger-hidann');
})
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    for (let i = 0; i < document.querySelectorAll('.is-open').length; ) {
      document.querySelectorAll('.is-open')[i].classList.remove('is-open');
    }
    burgerBtn.classList.remove('header-burger-hidann');
    closeBtn.classList.add('header-burger-hidann');
  }
});