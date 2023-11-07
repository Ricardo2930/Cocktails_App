//main container 
const mainContainer = document.querySelector('.container');

//search box
const searchBox = document.querySelector('.search-box')

//search input
const searchInput = document.querySelector('.search-box-input')

//display msg
const displayMsg = document.querySelector('.display-msg')

//info box of cocktail
const infoBox = document.querySelector('.info-box')

//instructions box
const instructionsBox = document.querySelector('.instructions-box')



searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    let inputValue = e.target.value;
    if (e.key == 'Enter') {
        if (e.target.value != '') {
            getDataFood(inputValue);
        }
    }
})


const getDataFood = async (inputValue) => {
    displayMsg.style.display = 'none'
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    const data = await response.json()
    const dataFood = data.drinks[0]
    console.log(dataFood)

    infoBox.innerHTML =
        `
        <header class="title-cocktail">
            <img class="title-cocktail-img" src="${dataFood.strDrinkThumb}" alt="">
            <aside class="box-name-cocktail">
            <h2 class="name-cocktail"><i class="fa-solid fa-martini-glass"></i> ${dataFood.strDrink}</h2>
            </aside> 
        </header>
    `


    let count = 1;
    let measureIngredient = []

    for (const key in dataFood) {
        if (key.startsWith('strIngredient') && dataFood[key]) {
            let ingredient = dataFood[key]
            let measure = dataFood['strMeasure' + count];
            count++;
            measureIngredient.push(`${measure} ${ingredient}`)
        }

    }


    const titleIngredients = document.createElement('h3')
    titleIngredients.innerHTML = `Ingredients <i class="fa-solid fa-list-check"></i>`
    titleIngredients.classList.add('ingredients-title')
    infoBox.appendChild(titleIngredients)

    const ulIngredient = document.createElement('ul');

    ulIngredient.classList.add('ingredients-cocktail')
    measureIngredient.forEach((dataIngredient) => {
        const liIngredient = document.createElement('li');
        liIngredient.innerHTML = dataIngredient;
        ulIngredient.appendChild(liIngredient);
        infoBox.appendChild(ulIngredient);


    })


    instructionsBox.innerHTML = `
    <h3 class='instructions-title'>Instructions <i class="fa-regular fa-rectangle-list"></i></h3> 
    <p class='instructions-details'>${dataFood.strInstructions}</p>`

}
