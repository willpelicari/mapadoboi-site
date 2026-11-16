// Google Analytics 4 for the Mapa do Boi pages (home, cuts, support, privacy). The web app under /app/ loads its own.
// Page views go to the app's GA4 property (its Web stream), next to the apps and the web app, and to the
// portfolio's property too, which counted these pages when they lived at wiltonpelicari.com/mapadoboi.
;(function () {
  var APP_ID = 'G-H3L3EY3SDX'
  var PORTFOLIO_ID = 'G-0WP0NW5YH5'

  var host = window.location.hostname
  var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
  var debug = /[?&]ga_debug\b/.test(window.location.search)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  // On a dev machine keep a no-op gtag, so callers never break.
  if (isLocal && !debug) {
    window.gtag = function () {}
    return
  }

  var s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + APP_ID
  document.head.appendChild(s)

  gtag('js', new Date())
  gtag('set', 'user_properties', {
    preferred_language: (navigator.language || '').toLowerCase(),
    color_scheme:
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  })
  gtag('config', APP_ID, { debug_mode: debug || undefined })
  gtag('config', PORTFOLIO_ID, { debug_mode: debug || undefined })

  // Store links are the clicks worth naming. Outbound links are also caught by GA's enhanced measurement.
  document.addEventListener(
    'click',
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null
      if (!a) return
      var href = a.href
      var from = window.location.pathname
      var store = /apps\.apple\.com|testflight\.apple\.com/.test(href)
        ? 'app_store'
        : /play\.google\.com/.test(href)
          ? 'google_play'
          : ''
      if (store) {
        gtag('event', 'app_store_click', {
          store: store,
          app_name: 'mapadoboi',
          link_url: href,
          link_text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 100),
          from_page: from,
        })
      } else if (href.indexOf('mailto:') === 0) {
        gtag('event', 'contact_click', { method: 'email', from_page: from })
      }
    },
    true
  )
})()
