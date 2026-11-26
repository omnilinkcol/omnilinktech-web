(() => {
  const mobile = document.querySelector('[data-mobile-menu]');
  const menu = document.querySelector('[data-nav]');
  if (mobile && menu) mobile.addEventListener('click', () => { const active = menu.classList.toggle('open'); mobile.setAttribute('aria-expanded', String(active)); });
  document.querySelectorAll('[data-nav] a').forEach(a => a.addEventListener('click', () => { menu?.classList.remove('open'); mobile?.setAttribute('aria-expanded','false'); }));
  const form = document.querySelector('[data-serial-form]');
  const input = document.querySelector('[data-serial-input]');
  const result = document.querySelector('[data-serial-result]');
  const serialFromUrl = new URLSearchParams(location.search).get('sn');
  if (input && serialFromUrl) input.value = serialFromUrl;
  function checkSerial() {
    if (!input || !result) return;
    let value = input.value.trim().toUpperCase();
    if (/^\d{1,4}$/.test(value)) value = `OL150-2026-${value.padStart(4,'0')}`;
    const match = /^OL150-2026-(\d{4})$/.exec(value);
    const n = match && Number(match[1]);
    const valid = Boolean(n && n >= 1 && n <= 10);
    result.hidden = false;
    result.className = `lookup-result ${valid ? 'is-found' : 'is-missing'}`;
    result.textContent = valid ? `${value}: número incluido en la serie de identificación inicial del modelo OL-150. La consulta no confirma fabricación, garantía ni propiedad.` : 'No se encontró ese identificador en la lista inicial 0001–0010. Comprueba el formato OL150-2026-0001.';
  }
  form?.addEventListener('submit', event => { event.preventDefault(); checkSerial(); });
  if (serialFromUrl) checkSerial();
})();
