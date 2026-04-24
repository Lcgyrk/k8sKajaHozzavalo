const http = require('http');
const url = require('url');

const dishes = [
  { id: 1,  nev: "Gulyásleves",          hozzavalok: ["marhahús", "hagyma", "paprika", "paradicsom", "burgonya", "só", "kömény", "fokhagyma"] },
  { id: 2,  nev: "Lecsó",               hozzavalok: ["paprika", "paradicsom", "hagyma", "kolbász", "tojás", "olaj"] },
  { id: 3,  nev: "Töltött káposzta",    hozzavalok: ["káposztalevél", "darált sertéshús", "rizs", "hagyma", "tejföl", "só", "bors", "pirospaprika"] },
  { id: 4,  nev: "Pörkölt",             hozzavalok: ["sertéshús", "hagyma", "pirospaprika", "só", "bors", "olaj", "paradicsom"] },
  { id: 5,  nev: "Halászlé",            hozzavalok: ["ponty", "hagyma", "pirospaprika", "só", "erős paprika", "paradicsom"] },
  { id: 6,  nev: "Rántott szelet",      hozzavalok: ["sertéskaraj", "tojás", "zsemlemorzsa", "liszt", "só", "olaj"] },
  { id: 7,  nev: "Rakott krumpli",      hozzavalok: ["burgonya", "tojás", "kolbász", "tejföl", "só", "vaj"] },
  { id: 8,  nev: "Palócлeves",          hozzavalok: ["birkahús", "burgonya", "zöldbab", "hagyma", "tejföl", "só", "kapor"] },
  { id: 9,  nev: "Húsleves",            hozzavalok: ["marhahús", "sárgarépa", "petrezselyem", "zeller", "hagyma", "só", "bors", "cérnametélt"] },
  { id: 10, nev: "Paprikás csirke",     hozzavalok: ["csirke", "hagyma", "pirospaprika", "tejföl", "só", "olaj"] },
  { id: 11, nev: "Lángos",             hozzavalok: ["liszt", "tej", "élesztő", "só", "olaj", "tejföl", "sajt", "fokhagyma"] },
  { id: 12, nev: "Kürtőskalács",       hozzavalok: ["liszt", "tojás", "tej", "vaj", "cukor", "élesztő", "fahéj"] },
  { id: 13, nev: "Somlói galuska",     hozzavalok: ["piskóta", "diókrém", "csokoládékrém", "rum", "tejszín", "dió", "mazsola"] },
  { id: 14, nev: "Dobos torta",        hozzavalok: ["piskótalap", "csokoládékrém", "vaj", "cukor", "tojás", "karamell"] },
  { id: 15, nev: "Rétes",              hozzavalok: ["réteslap", "alma", "cukor", "fahéj", "zsemlemorzsa", "vaj"] },
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const parsed = url.parse(req.url, true);

  if (parsed.pathname === '/dishes') {
    res.writeHead(200);
    res.end(JSON.stringify(dishes));
  } else if (parsed.pathname === '/ingredients') {
    const id = parseInt(parsed.query.id);
    const dish = dishes.find(d => d.id === id);
    if (dish) {
      res.writeHead(200);
      res.end(JSON.stringify({ hozzavalok: dish.hozzavalok }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Étel nem található' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Backend running on port 3000');
});
