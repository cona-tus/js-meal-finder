const searchInput = document.getElementById('search-input');
const submitForm = document.getElementById('submit-form');
const randomBtn = document.getElementById('random-btn');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const mealEl = document.getElementById('meal-item');

// Search meal && fetch from API
async function onSearchMeal(event) {
  event.preventDefault();

  mealEl.innerHTML = '';

  const term = searchInput.value;

  if (term.trim()) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await res.json();

    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
      mealsEl.innerHTML = '';
    } else {
      resultHeading.innerHTML = `<p>There are ${data.meals.length} search results.</p>`;

      mealsEl.innerHTML = data.meals
        .map(
          (meal) => `
            <div class="meal" data-mealId="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
        )
        .join('');
    }
    searchInput.value = '';
  } else {
    alert('Please enter a search term.');
    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
  }
}

// Fetch meal by ID
async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();
  const meal = data.meals[0];
  addMealToDOM(meal);
}

//fetch random meal from API
async function onGetRandomMeal() {
  mealEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const data = await res.json();

  const meal = data.meals[0];

  addMealToDOM(meal);
}

// Add meal to DOM
function addMealToDOM(meal) {
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      const mealObj = {
        ingredient: `${meal[`strIngredient${i}`]}`,
        measure: `${meal[`strMeasure${i}`]}`,
      };

      ingredients.push(mealObj);
    } else {
      break;
    }
  }

  resultHeading.innerHTML = '';
  mealsEl.innerHTML = '';

  mealEl.innerHTML = `
  <div class="meal-item">
  <p class="item-subtitle">
  ${meal.strArea ? `<span>${meal.strArea}</span>` : ''}
  ${meal.strCategory ? `<span>${meal.strCategory}</span>` : ''}
  </p>
    <h1 class="item-title">${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

    <div class="item-info">
    <ul>
    ${ingredients
      .map((ing) => `<li>${ing.ingredient} | ${ing.measure}</li>`)
      .join('')}
  </ul>
      <p class="item-instruction">${meal.strInstructions}</p>
    </div>
    </div>
  `;
}

// Get Meal with data attribute
function onGetMeal(event) {
  const mealID = event.target.parentNode.getAttribute('data-mealid');

  if (mealID) {
    getMealById(mealID);
  }
}

submitForm.addEventListener('submit', onSearchMeal);
randomBtn.addEventListener('click', onGetRandomMeal);
mealsEl.addEventListener('click', onGetMeal);
