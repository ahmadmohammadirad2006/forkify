import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginaitonView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentElement.addEventListener("click" , function(e){
        const btn = e.target.closest('.btn--inline') ;
        if(!btn) return

        const goToPage =  +btn.dataset.goto;
        handler(goToPage)

    })
  }


  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );


    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next' , curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton('prev', curPage)}
        ${this._generateMarkupButton('next', curPage)}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(type , currentPage) {
    return `
    <button data-goto='${type === "prev" ? currentPage - 1 : currentPage + 1}' class="btn--inline pagination__btn--${type}">
      
    ${
      type === 'prev'
        ? `
    <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
      </svg>
      
      <span>Page ${currentPage - 1}</span>
    `
        : `
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    `
    }

    </button>`;
  }
}

export default new PaginaitonView();
