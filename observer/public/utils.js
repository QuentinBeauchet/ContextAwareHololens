/**
 * Pretty Print JSON Objects.
 * Inspired by http://jsfiddle.net/unLSJ/
 *
 * @return {string}    html string of the formatted JS object
 * @example:  var obj = {"foo":"bar"};  obj.prettyPrint();
 */
Object.prototype.prettyPrint = function () {
  var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
  var replacer = function (match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class="json-key" style="color: brown">',
      val = '<span class="json-value" style="color: navy">',
      str = '<span class="json-string" style="color: olive">',
      r = pIndent || "";
    if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
    if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>";
    return r + (pEnd || "");
  };

  return JSON.stringify(this, null, 3)
    .replace(/&/g, "&amp;")
    .replace(/\\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(jsonLine, replacer);
};

/**
 * Generate a fieldset element from a list.
 * @param {List} iter The list to iter on
 * @param {Function} id The function to generate the id
 * @param {String} name The name of the fieldset
 * @param {String} type The data-type of the fieldset
 * @param {Function} label The function to generate the content of the label
 * @returns A fieldset as a stirng.
 */
export function generateFieldSet(iter, id, name, type, label) {
  return `
    <fieldset>
        <legend>${name}</legend>
        ${iter
          .map(
            (el, i) => `
                <div>
                    <input type="radio" id="${id(i)}" name="${name}" data-type="${type}" ${i == 0 ? "checked" : ""}>
                    <label for="${id(i)}">${label(el, i)}</label>
                </div>
            `
          )
          .join("")}
    </fieldset>`;
}
