(function () {
  const input = document.getElementById('text-input');
  const normalization = document.getElementById('normalization');
  const showCodepoints = document.getElementById('show-codepoints');
  const outputText = document.getElementById('output-text');
  const outputCodepoints = document.getElementById('output-codepoints');

  function formatCodePoint(codePoint) {
    return 'U+' + codePoint.toString(16).toUpperCase().padStart(4, '0');
  }

  function getCodePoints(str) {
    return Array.from(str).map(function (char) {
      return {
        char: char,
        code: char.codePointAt(0)
      };
    });
  }

  function render() {
    let raw = input.value;
    const form = normalization.value;

    let normalized = form === 'none' ? raw : raw.normalize(form);
    const codePoints = getCodePoints(normalized);

    outputText.textContent = normalized === '' ? '' : normalized;

    outputCodepoints.innerHTML = '';
    if (codePoints.length === 0) {
      return;
    }
    const showCodes = showCodepoints.checked;
    codePoints.forEach(function (item) {
      const u = formatCodePoint(item.code);
      const href = 'https://www.compart.com/en/unicode/' + u;
      const span = document.createElement('span');
      span.className = 'cp-item';
      span.innerHTML =
        '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" class="cp-char-link" title="View on Compart">' +
        '<span class="char" title="' + escapeHtml(item.char) + '">' +
        escapeHtml(displayChar(item.char)) +
        '</span></a>' +
        (showCodes ? '<span class="code">' + u + '</span>' : '');
      outputCodepoints.appendChild(span);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function displayChar(char) {
    if (char === ' ') return '\u00A0'; // visible space
    if (char === '\n') return '↵';
    if (char === '\t') return '→';
    return char;
  }

  input.addEventListener('input', render);
  input.addEventListener('paste', function () {
    setTimeout(render, 0);
  });
  normalization.addEventListener('change', render);
  showCodepoints.addEventListener('change', render);

  render();
})();
