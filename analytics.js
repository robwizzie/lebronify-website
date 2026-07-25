/* ============================================================
   LEBRONIFY ANALYTICS

   A thin, provider-agnostic wrapper so the rest of the site only ever
   calls LBAnalytics.track(). Swapping providers is a one-line change here
   and nothing else in the codebase moves.

   ---------------------------------------------------------------
   SETUP — pick ONE provider and fill in its id below.

     'ga4'        Google Analytics 4. Set id to your Measurement ID
                  ("G-XXXXXXXXXX"), from Admin > Data Streams.
     'plausible'  Plausible. Set id to your domain ("lebronify.app").
     'cloudflare' Cloudflare Web Analytics. Set id to the token from
                  the Web Analytics dashboard.
     'none'       Disabled (the default). Everything becomes a no-op.

   Until PROVIDER is changed from 'none', no script is loaded and no
   request leaves the browser.
   ---------------------------------------------------------------

   Privacy: respects the browser's Do Not Track signal and a local
   opt-out (localStorage 'lebronify_no_analytics'). No personally
   identifying information is ever collected — events carry song titles
   and counts only.
   ============================================================ */

(function (window, document) {
	'use strict';

	var PROVIDER = 'none'; // 'ga4' | 'plausible' | 'cloudflare' | 'none'
	var ID = '';           // measurement id / domain / token — see above

	var OPT_OUT_KEY = 'lebronify_no_analytics';
	var queue = [];
	var ready = false;

	function doNotTrack() {
		var dnt = window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack;
		return dnt === '1' || dnt === 'yes';
	}

	function optedOut() {
		try {
			return window.localStorage.getItem(OPT_OUT_KEY) === '1';
		} catch (e) {
			return false;
		}
	}

	var enabled = PROVIDER !== 'none' && !!ID && !doNotTrack() && !optedOut();

	function loadScript(src, attrs) {
		var s = document.createElement('script');
		s.async = true;
		s.src = src;
		if (attrs) {
			Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
		}
		// A blocked or failed analytics script must never break the page.
		s.onerror = function () { ready = false; };
		document.head.appendChild(s);
		return s;
	}

	function init() {
		if (!enabled) return;

		if (PROVIDER === 'ga4') {
			loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID));
			window.dataLayer = window.dataLayer || [];
			window.gtag = function () { window.dataLayer.push(arguments); };
			window.gtag('js', new Date());
			// anonymize_ip keeps this friendlier in the EU without changing the data we care about.
			window.gtag('config', ID, { anonymize_ip: true });
		} else if (PROVIDER === 'plausible') {
			loadScript('https://plausible.io/js/script.js', { 'data-domain': ID });
			window.plausible = window.plausible || function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
		} else if (PROVIDER === 'cloudflare') {
			loadScript('https://static.cloudflareinsights.com/beacon.min.js', {
				'data-cf-beacon': JSON.stringify({ token: ID })
			});
		}

		ready = true;
		// Drain anything tracked before the provider finished booting.
		var pending = queue.splice(0, queue.length);
		pending.forEach(function (e) { send(e.name, e.params); });
	}

	function send(name, params) {
		if (!enabled) return;
		if (!ready) { queue.push({ name: name, params: params }); return; }

		try {
			if (PROVIDER === 'ga4' && window.gtag) {
				window.gtag('event', name, params || {});
			} else if (PROVIDER === 'plausible' && window.plausible) {
				window.plausible(name, params ? { props: params } : undefined);
			}
			// Cloudflare Web Analytics is pageview-only; custom events are a no-op.
		} catch (e) {
			/* Analytics must never throw into the app. */
		}
	}

	/* Public API ------------------------------------------------- */

	var LBAnalytics = {
		/**
		 * Records an event. Safe to call before init and safe to call when
		 * analytics is disabled — both are no-ops.
		 * @param {string} name   snake_case event name
		 * @param {object} [params] flat map of primitives
		 */
		track: function (name, params) {
			if (!name) return;
			send(name, params);
		},

		/** Records a virtual pageview for SPA-style view changes. */
		page: function (path, title) {
			if (!enabled) return;
			if (PROVIDER === 'ga4' && window.gtag) {
				window.gtag('event', 'page_view', {
					page_path: path,
					page_title: title || document.title
				});
			} else {
				send('pageview', { path: path });
			}
		},

		/** Lets a visitor turn tracking off from the console or a UI control. */
		optOut: function () {
			try { window.localStorage.setItem(OPT_OUT_KEY, '1'); } catch (e) {}
			enabled = false;
		},

		optIn: function () {
			try { window.localStorage.removeItem(OPT_OUT_KEY); } catch (e) {}
		},

		isEnabled: function () { return enabled; }
	};

	window.LBAnalytics = LBAnalytics;

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})(window, document);
