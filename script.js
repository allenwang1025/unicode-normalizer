(function () {
  const input = document.getElementById('text-input');
  const normalization = document.getElementById('normalization');
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
    codePoints.forEach(function (item) {
      const u = formatCodePoint(item.code);
      const href = 'https://www.compart.com/en/unicode/' + u;
      const a = document.createElement('a');
      a.className = 'cp-item';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML =
        '<span class="char" title="' + escapeHtml(item.char) + '">' +
        escapeHtml(displayChar(item.char)) +
        '</span>' +
        '<span class="code">' + u + '</span>';
      outputCodepoints.appendChild(a);
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

  render();
})();
