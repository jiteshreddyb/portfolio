const root = document.documentElement;
const themeButton = document.querySelector('#theme');
function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
}
let dark = matchMedia('(prefers-color-scheme: dark)').matches;
try {
  const saved = localStorage.getItem('theme');
  if (saved) dark = saved === 'dark';
} catch {}
setTheme(dark);
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  setTheme(root.dataset.theme !== 'dark');
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
});
const main = document.querySelector('main');
const sections = [...main.querySelectorAll('section')];
const links = [...document.querySelectorAll('nav a')];
function highlightSection() {
  const mobile = matchMedia('(max-width:700px)').matches;
  const scroller = mobile ? document.scrollingElement : main;
  const atBottom = scroller.scrollTop > 0 && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
  const visible = sections.filter(section => section.getBoundingClientRect().top <= 80);
  const current = atBottom ? sections.at(-1) : visible.at(-1) || sections[0];
  for (const link of links) {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
main.addEventListener('scroll', highlightSection, {passive:true});
window.addEventListener('scroll', highlightSection, {passive:true});
window.addEventListener('resize', highlightSection);
highlightSection();
