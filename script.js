const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const updateMenuVisibility = () => {
  menuToggle.style.display = window.innerWidth <= 900 ? 'flex' : 'none';
};
updateMenuVisibility();
window.addEventListener('resize', updateMenuVisibility);

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  mainNav.classList.toggle('is-open', open);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  });
});

const concernSelect = document.querySelector('select[name="concern"]');
const bookingDialog = document.querySelector('#booking-dialog');
document.querySelector('[data-open-booking]').addEventListener('click', () => bookingDialog.showModal());
document.querySelector('.booking-dialog__close').addEventListener('click', () => bookingDialog.close());
document.querySelectorAll('[data-concern]').forEach((link) => {
  link.addEventListener('click', () => {
    const choice = [...concernSelect.options].find((option) => option.textContent.startsWith(link.dataset.concern));
    if (choice) concernSelect.value = choice.value || choice.textContent;
    bookingDialog.showModal();
  });
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name')).trim();
  document.querySelector('#form-message').textContent = `${name}님, 상담 신청 내용이 확인되었습니다. 방문 전 상세 일정은 전화로 안내해 드립니다.`;
  event.currentTarget.reset();
});
