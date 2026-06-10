import gsap from 'gsap';

export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 4000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export function getBezierPoints(p1, p2, numPoints = 60) {
  const points = [];
  const midLat = (p1[0] + p2[0]) / 2;
  const midLng = (p1[1] + p2[1]) / 2;
  
  const dLat = p2[0] - p1[0];
  const dLng = p2[1] - p1[1];
  
  const ctrlLat = midLat + dLng * 0.15;
  const ctrlLng = midLng - dLat * 0.15;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * ctrlLat + t * t * p2[0];
    const lng = (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * ctrlLng + t * t * p2[1];
    points.push([lat, lng]);
  }
  return points;
}

export function getHaversineDistance(p1, p2) {
  const R = 6371;
  const dLat = (p2[0] - p1[0]) * Math.PI / 180;
  const dLng = (p2[1] - p1[1]) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1[0] * Math.PI / 180) * Math.cos(p2[0] * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function fetchDeezerJSONP(title, artist) {
  return new Promise((resolve, reject) => {
    const cbName = `deezer_cb_${Math.round(Math.random() * 1000000)}`;
    const script = document.createElement('script');
    
    window[cbName] = (data) => {
      cleanup();
      if (data && data.data && data.data[0] && data.data[0].preview) {
        resolve(data.data[0].preview);
      } else {
        reject(new Error(`No track found for ${title} on Deezer`));
      }
    };
    
    script.onerror = () => {
      cleanup();
      reject(new Error(`Deezer JSONP script load failed for ${title}`));
    };
    
    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      delete window[cbName];
    }
    
    const query = `track:"${title}" artist:"${artist}"`;
    const targetUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${cbName}`;
    script.src = targetUrl;
    document.body.appendChild(script);
  });
}

export async function fetchPreviewUrl(title, artist) {
  try {
    const url = await fetchDeezerJSONP(title, artist);
    if (url) return url;
  } catch (e) {
    console.warn(`Direct Deezer JSONP search failed for ${title}:`, e.message);
  }

  try {
    const response = await fetchWithTimeout(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.deezer.com/search?q=track:"${title}" artist:"${artist}"`)}`, { timeout: 3000 });
    const data = await response.json();
    const parsed = JSON.parse(data.contents);
    if (parsed && parsed.data && parsed.data[0] && parsed.data[0].preview) {
      return parsed.data[0].preview;
    }
  } catch (e) {
    console.error(`Failed proxy Deezer search fallback for ${title}:`, e);
  }

  return null;
}

export function triggerHeartBurst(x, y) {
  const container = document.getElementById('heart-burst-container');
  if (!container) return;

  for (let i = 0; i < 45; i++) {
    const heart = document.createElement('div');
    heart.innerText = Math.random() > 0.5 ? '❤️' : '💜';
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${16 + Math.random() * 24}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    container.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 180;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - (100 + Math.random() * 200);

    gsap.fromTo(heart,
      { scale: 0, opacity: 1, x: 0, y: 0 },
      {
        scale: 1.5,
        opacity: 0,
        x: destX,
        y: destY,
        rotation: Math.random() * 360,
        duration: 1.5 + Math.random() * 1.5,
        ease: 'power2.out',
        onComplete: () => heart.remove()
      }
    );
  }
}
