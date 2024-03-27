import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resutlsView from './views/resutlsView.js';
import paginationView from './views/paginationView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';




const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    
   
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resutlsView.renderSpinner()
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);
    
    // Render search results
    resutlsView.render(model.getResultsPage())

    // Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    resutlsView.renderError(err.message)
  }
};

const controlPagination = function(goToPage){
    // Render NEW search results
    resutlsView.render(model.getResultsPage(goToPage))

    // Render NEW pagination buttons
    paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  // Update the recipe servings (in the state)
  model.updateServings(newServings)
  // Update the recipe view
  recipeView.render(model.state.recipe);

}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

};
init();
