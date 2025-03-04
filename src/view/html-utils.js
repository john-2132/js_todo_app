/**
 * 特殊文字をエスケープして、安全なHTML文字列を返す。
 * @param {string} str - エスケープする文字列。
 * @returns {string} エスケープされた文字列。
 */
export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * HTML文字列をDOM要素に変換する。
 * @param {string} html - HTML文字列。
 * @returns {Element|null} 変換されたDOM要素。
 */
export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * テンプレートリテラルをHTML要素に変換する。
 * @param {TemplateStringsArray} strings - テンプレートリテラルの静的な文字列部分。
 * @param {...(string|number|boolean|Element)} values - 挿入される値。
 * @returns {Element|null} 生成されたDOM要素。
 */
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

/**
 * 指定したコンテナ要素の内容を置き換え、新しい要素を追加する。
 * @param {Element} bodyElement - 追加する要素。
 * @param {Element} containerElement - コンテンツを置き換えるコンテナ要素。
 */
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
}
