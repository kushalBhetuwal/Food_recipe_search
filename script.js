const searchform = document.querySelector('form');
const searchresultdiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchquery = '';
const  APP_ID = '1d6f6c9d'; 
const APP_KEY = "4d5f795e26e2ed15284b22ded67ab2ed";


searchform.addEventListener('submit', (e)=>{
e.preventDefault();
searchquery = e.target.querySelector('input').value;//you are using e.target because you are specifically targeting that particular element:
console.log(searchquery)
fetchapi();

});

async function fetchapi(){
const baseurl = `https://api.edamam.com/search?q=${searchquery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=50`;
const response = await fetch(baseurl);
const data = await response.json();
generateHTML(data.hits);
console.log(data);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedhtml = '';
    results.map(result=>{
        generatedhtml+=
        ` <div class="item">
        <img src=${result.recipe.image} alt="">
        <div class="flex-container"> 
          <h1 class = "title">${result.recipe.label}</h1>
          <a href="${result.recipe.url}" target="_blank" class = "view-button">View Recipe</a>
        </div>
        <p class = "item-data">${result.recipe.calories.toFixed(2)}</p>
        <p class = "item-data">${result.recipe.dietLabels.length>0 ? result.recipe.dietLabels: "No data found"}</p>
        <p class = "item-data">${result.recipe.dishType}</p>
      </div>`

    })
    searchresultdiv.innerHTML = generatedhtml;
}