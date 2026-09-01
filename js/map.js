/* ==========================================================================
   TECHNOSOFT MASTERS INC. - Contact Location Map
   3210 Airway Drive, Mississauga, ON
   ========================================================================== */

(function () {
  const mapElement = document.getElementById('location-map');
  if (!mapElement) return;

  // 3210 Airway Dr, Mississauga, ON L4V 1Y6
  const lat = 43.7018;
  const lng = -79.6415;

  function initMap() {
    if (typeof L === 'undefined') {
      // Fallback if Leaflet isn't loaded
      mapElement.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:20px;background:#050f24;color:#94a3b8;">
          <p style="font-weight:700;color:#ffffff;margin-bottom:8px;">TECHNOSOFT MASTERS INC. HEADQUARTERS</p>
          <p style="font-size:0.9rem;color:#cbd5e1;">3210 Airway Drive, Mississauga, ON</p>
          <a href="https://maps.google.com/?q=3210+Airway+Drive,+Mississauga,+ON" target="_blank" rel="noopener noreferrer" style="margin-top:12px;color:#f3c64c;font-size:0.85rem;font-weight:700;">View in Google Maps &rarr;</a>
        </div>
      `;
      return;
    }

    // Initialize Leaflet Map
    const map = L.map('location-map', {
      center: [lat, lng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false
    });

    // Dark Matter tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom Blue & Gold Glowing Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;">
          <div style="position:absolute;width:38px;height:38px;border-radius:50%;background:rgba(0,210,255,0.4);animation:pin-pulse 2s infinite ease-out;"></div>
          <div style="position:relative;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#00d2ff,#f3c64c);border:2px solid #ffffff;box-shadow:0 0 15px rgba(243,198,76,0.8);display:flex;align-items:center;justify-content:center;">
            <div style="width:6px;height:6px;border-radius:50%;background:#ffffff;"></div>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Popup with Brand Details
    marker.bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px 4px;color:#0b0f19;">
        <strong style="font-size:0.95rem;color:#004ecc;display:block;margin-bottom:3px;">Technosoft Masters Inc.</strong>
        <span style="font-size:0.8rem;color:#475569;display:block;line-height:1.4;">3210 Airway Drive<br>Mississauga, ON</span>
        <a href="https://maps.google.com/?q=3210+Airway+Drive,+Mississauga,+ON" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;color:#d4af37;font-weight:700;font-size:0.75rem;text-decoration:none;">Open Google Maps &rarr;</a>
      </div>
    `);

    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
