// Custom Marp Engine — fügt jedem Code-Block einen Copy-Button hinzu.
//
// Aufruf: marp --engine ./slides/marp-engine.js slides/deck.md
// (im GitHub Action automatisch via --engine Flag)

const { Marp } = require('@marp-team/marp-core')

module.exports = (opts) => {
  const marp = new Marp(opts)

  marp.markdown.use((md) => {
    const defaultFence = md.renderer.rules.fence

    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const html = defaultFence.apply(this, [tokens, idx, options, env, self])

      // Inline onclick — kein externes Script nötig. Self-contained,
      // funktioniert in jedem statischen Marp-HTML-Output.
      const button =
        '<button class="copy-btn" type="button" onclick="' +
          "(function(b){" +
            "var c=b.parentNode.querySelector('code');" +
            "if(!c||!navigator.clipboard)return;" +
            "navigator.clipboard.writeText(c.innerText).then(function(){" +
              "var orig=b.textContent;" +
              "b.textContent='✓ Copied';" +
              "b.classList.add('copied');" +
              "setTimeout(function(){b.textContent=orig;b.classList.remove('copied');},1400);" +
            "});" +
          "})(this)" +
        '">Copy</button>'

      // Button vor schließendem </pre> einfügen
      return html.replace('</pre>', button + '</pre>')
    }
  })

  return marp
}
