export async function authFetch(url, token, opts = {}) {
  const headers = opts.headers || {};
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Network response was not ok');
  }
  return res.json();
}