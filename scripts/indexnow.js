// Notifies Bing / IndexNow-participating engines of every URL in the live sitemap.
// Run after a production deploy: node scripts/indexnow.js
const HOST = "chayceproperties.com";
const KEY = "817223a2cbfaa13daf2386d59fc5a6c2";

(async () => {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow submitted ${urlList.length} URLs, HTTP ${res.status}`);
  if (res.status >= 400) process.exit(1);
})();
