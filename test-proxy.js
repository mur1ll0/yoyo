async function testProxy() {
  const targetDeezer = 'https://api.deezer.com/search?q=track:"Outside" artist:"Calvin Harris"';
  const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetDeezer)}`;

  try {
    const start = Date.now();
    console.log('Fetching via codetabs...');
    const res = await fetch(proxyUrl);
    const text = await res.text();
    console.log(`Time: ${Date.now() - start}ms`);
    console.log('Raw output (first 200 chars):', text.slice(0, 200));
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

testProxy();
