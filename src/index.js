// const API_KEY = 'apikey=a275ab90';
const API_KEY = 'apikey=8317fb74';
const API_URL = `http://www.omdbapi.com/?${API_KEY}`;

const SEARCH_URL = API_URL + '&s=Avengers';
const SEARCH_MOVIE = (id) => API_URL + '&i=' + id;

const pai = document.getElementById('root');
const idDaUrl = window.location.search
  ? window.location.search.split('=')[1]
  : null;

// ['?id', 'tt0848228']
buscaFilmes(idDaUrl)
  .then(idDaUrl ? adicionaFilme(false) : adiciona);

function adiciona({ Search: filmes }) {
  filmes.forEach(adicionaFilme(true));
  // adicionaFilme() -> (filme) => {}
  // adicionaFilme(pai, true)(0)
  // adicionaFilme(pai, true)(1)
  // adicionaFilme(pai, true)(2)
  // adicionaFilme(pai, true)(3)
}

function mudaPagina(id) {
  return function () {
    console.log('muda pagina para id ' + id);
    const novaUrl = window.location.protocol + window.location.pathname;
    window.location.assign(novaUrl + '?id=' + id);
  }
}

function adicionaFilme(temClique) {
  return function (filme) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const img = document.createElement('img');
    p.innerText = filme.Title;
    img.src = filme.Poster;
  
    if (temClique) {
      const id = filme.imdbID;
      img.onclick = mudaPagina(id);
    } else {
      img.onclick = () => {
        window.location.assign(window.location.protocol + window.location.pathname);
      }
    }
  
    div.append(img);
    div.prepend(p);
    pai.append(div);
  }
}

function buscaFilmes(id) {
  const URL = id ? SEARCH_MOVIE(id) : SEARCH_URL;

  return fetch(URL)
  .then((data) => data.json())
}