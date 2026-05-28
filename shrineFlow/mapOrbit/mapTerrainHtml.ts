import type { SiteRecord } from '../routeArchive/categoryRegistry';
import { categoryAccents } from '../themeStone/palette';

export const buildMapHtml = (sites: SiteRecord[]): string => {
  const sitesJson = JSON.stringify(
    sites.map(s => ({
      id: s.id,
      lat: s.coordinates[0],
      lng: s.coordinates[1],
      name: s.name,
      region: `${s.city}, ${s.country}`,
      cat: s.category,
      color: categoryAccents[s.category] ?? '#5DBDA7',
    })),
  );

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #m { height:100%; margin:0; background:#040814; }
  .pin {
    width: 22px; height: 22px; border-radius: 50%;
    box-shadow: 0 0 14px var(--c), 0 0 0 2px rgba(4,8,20,0.7);
    background: var(--c);
    transform: translate(-11px,-11px);
    position: relative;
    transition: transform 320ms cubic-bezier(.2,.7,.3,1), box-shadow 320ms ease;
  }
  .pin::after {
    content:""; position:absolute; inset:5px; border-radius:50%;
    background: radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 60%);
  }
  .pin-ring {
    position:absolute; left:-10px; top:-10px; width: 42px; height:42px; border-radius:50%;
    border: 1px solid var(--c); opacity:.4;
    animation: pulse 2.2s ease-in-out infinite;
  }
  .pin-host.active .pin {
    transform: translate(-11px,-11px) scale(1.55);
    box-shadow: 0 0 28px var(--c), 0 0 0 3px rgba(4,8,20,0.85), 0 0 0 6px var(--c);
    filter: brightness(1.25) saturate(1.2);
  }
  .pin-host.active .pin-ring {
    animation: activePulse 1.4s ease-out infinite;
    border-width: 1.5px;
    opacity: .85;
  }
  @keyframes pulse {
    0% { transform: scale(0.6); opacity: 0.45; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes activePulse {
    0% { transform: scale(0.7); opacity: 0.9; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  .leaflet-control-attribution { display: none !important; }
  .leaflet-control-zoom { display: none !important; }
</style>
</head>
<body>
<div id="m"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var map = L.map('m', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 3, maxZoom: 12,
  }).setView([32.5, 35], 5);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    detectRetina: true,
  }).addTo(map);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    detectRetina: true,
    opacity: 0.6,
  }).addTo(map);

  function send(msg) {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
  }

  var sites = ${sitesJson};
  var markers = {};
  var activeId = null;

  function buildIcon(color) {
    var html = '<div class="pin-host">' +
               '<div class="pin-ring" style="--c:' + color + '"></div>' +
               '<div class="pin" style="--c:' + color + '"></div>' +
               '</div>';
    return L.divIcon({ className: 'pin-icon', html: html, iconSize: [22, 22] });
  }

  sites.forEach(function(s) {
    var m = L.marker([s.lat, s.lng], { icon: buildIcon(s.color) }).addTo(map);
    m._site = s;
    m.on('click', function() {
      setActive(s.id);
      send({ type: 'pin', id: s.id, name: s.name, region: s.region, cat: s.cat });
      map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 7), { duration: 0.9 });
    });
    markers[s.id] = m;
  });

  function setActive(id) {
    if (activeId === id) return;
    if (activeId && markers[activeId]) {
      var prev = markers[activeId].getElement();
      if (prev) {
        var host = prev.querySelector('.pin-host');
        if (host) host.classList.remove('active');
      }
    }
    activeId = id;
    if (id && markers[id]) {
      var el = markers[id].getElement();
      if (el) {
        var host2 = el.querySelector('.pin-host');
        if (host2) host2.classList.add('active');
      }
    }
  }

  map.on('click', function() {
    setActive(null);
    send({ type: 'blank' });
  });

  window.__focusPin = function(id) {
    var entry = markers[id];
    if (!entry || !entry._site) return;
    var s = entry._site;
    setActive(id);
    map.flyTo([s.lat, s.lng], 7.5, { duration: 1.0 });
  };

  window.__clearActive = function() {
    setActive(null);
  };

  send({ type: 'ready' });
</script>
</body>
</html>`;
};
