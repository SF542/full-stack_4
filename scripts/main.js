'use strict';

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

const slides = [
  {src: 'assets/images/pancakes.jpg', alt: 'Pancakes with berries and maple syrup'},
  {src: 'assets/images/berry-slide.jpg', alt: 'Fresh berries, a seasonal pancake topping'},
  {src: 'assets/images/fruit-slide.jpg', alt: 'Fresh fruit, a seasonal pancake topping'},
];
let currentSlide = 0;
const featuredFood = document.querySelector('#featured-food');
const slideButtons = document.querySelectorAll('[data-slide]');
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  featuredFood.src = slides[currentSlide].src;
  featuredFood.alt = slides[currentSlide].alt;
  slideButtons.forEach((button, i) => {
    button.classList.toggle('is-active', i === currentSlide);
    button.setAttribute('aria-pressed', String(i === currentSlide));
  });
}
slideButtons.forEach(button => button.addEventListener('click', () => showSlide(Number(button.dataset.slide))));
document.querySelectorAll('[data-slide-step]').forEach(button => {
  button.addEventListener('click', () => showSlide(currentSlide + Number(button.dataset.slideStep)));
});
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal());
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog__close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-close-dialog]').forEach(link => link.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
