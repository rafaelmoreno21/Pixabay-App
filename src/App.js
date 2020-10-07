import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import ListImg from './components/ListImg';

function App() {

  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);
  const [actualpage, saveActualPage] = useState(1);
  const [totalpage, saveTotalPage] = useState(5);

  useEffect(() => {

    const consultAPI = async () => {
      if (search === '') return;

      const imgPage = 30;
      const key = '18613854-b2301fddd919c712faf1559c2';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPage}&page=${actualpage}`;
      const response = await fetch(url);
      const result = await response.json();
      saveImages(result.hits);

      const calculatePage = Math.ceil(result.totalHits / imgPage);
      saveTotalPage(calculatePage);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });

    }
    consultAPI()

  }, [search, actualpage])

  const pagePrevious = () => {
    const newPageActual = actualpage - 1;
    if (newPageActual === 0) return;
    saveActualPage(newPageActual);
  };

  const pageNext = () => {
    const newPageActual = actualpage + 1;
    if (newPageActual > totalpage) return;
    saveActualPage(newPageActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image search engine</p>

        <Form
          saveSearch={saveSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ListImg
          images={images}
        />
        {(actualpage === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={pagePrevious}
          >&laquo; Previous</button>
        )}
        {(actualpage === totalpage) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={pageNext}
          >Next &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
