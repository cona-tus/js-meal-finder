# ๐ช ๋ ์ํผ ๊ฒ์ ์ฑ, 'Nana's Recipes' ํ ์ดํ๋ก์ ํธ

![meal-thumb](https://user-images.githubusercontent.com/90844424/211139993-6fd9d765-7ce3-411b-80cd-a643b52f538d.jpg)

<br />

[![Netlify Status](https://api.netlify.com/api/v1/badges/7db2dd57-0cab-4e59-ac4b-9d1badf763b3/deploy-status)](https://app.netlify.com/sites/conatus-js-meal-finder/deploys) | [Live Demo](https://conatus-js-meal-finder.netlify.app/)

<br/>
<br/>

# 1. Project

## 1.1. Project Information

๋ณธ ํ๋ก์ ํธ๋ **๋ ์ํผ ๊ฒ์ ์ ํ๋ฆฌ์ผ์ด์** ์๋๋ค. [TheMealDB](www.themealdb.com)์์ ์ ๊ณตํ๋ ์์ ๋ฐ์ดํฐ API๋ฅผ ๋ฐํ์ผ๋ก ์ ์ํ์ต๋๋ค. ๊ฒ์์ด๋ฅผ ์๋ ฅํ๋ฉด ํค์๋๋ฅผ ํฌํจํ ๋ชฉ๋ก์ด ๋์ค๊ณ , ๊ทธ ์ค ํ๋๋ฅผ ํด๋ฆญํ๋ฉด ํด๋น ์์ดํ์ ์์ธ ์ ๋ณด๋ฅผ ๋ณผ ์ ์์ต๋๋ค. ๋ํ ํน์  ํค์๋๋ฅผ ์๋ ฅํ์ง ์๊ณ  ๋๋คํ ๋ ์ํผ๋ฅผ ๋ฐ์ ์๋ ์์ต๋๋ค.

<br/>

## 1.2. Project Duration & Participants

- 2023-1-7 ~ 2023-1-7
- ๊ฐ์ธ ํ๋ก์ ํธ (1์ธ)

<br/>
<br/>

# 2. Skills

![HTML](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff) ![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

# 3. Main Features

## 3.1. Searching Recipes by Keywords

![meal-search](https://user-images.githubusercontent.com/90844424/211146022-3259f4e5-1214-4799-9c86-597e5f454e4a.gif)

ํค์๋๋ก ๊ฒฐ๊ณผ ๋ชฉ๋ก์ ์ด๊ฑฐํ  ์ ์๋ API๋ฅผ ํ์ฉํด ๊ฒ์์ด ๊ฐ๋ฅํฉ๋๋ค. ๊ฒ์์ฐฝ์ ์๋ ฅํ ๊ฐ์ term์ ํ ๋นํ์ฌ fetchํ  url์ ๋ฃ์ด์คฌ์ต๋๋ค. ๊ฒ์ ๊ฒฐ๊ณผ๋ div.mealsEl์ innerHTML์ ์์ ํ์ฌ div.meal๋ฅผ ์ถ๊ฐํ์ต๋๋ค.

```js
// Search meal & fetch from API
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

submitForm.addEventListener('submit', onSearchMeal);
```

<br />

## 3.2. Fetching Random Recipes

![meal-random](https://user-images.githubusercontent.com/90844424/211146742-a39bed13-d902-48c1-8a6c-234a8089608d.gif)

๋๋ค API๋ฅผ ํตํด ํ๋์ ๋ ์ํผ๋ฅผ ์์ธํ๊ฒ ์ดํด๋ณผ ์ ์์ต๋๋ค. meal ๋ฐ์ดํฐ๋ฅผ DOM์ ์ถ๊ฐํ๋ ํจ์์ ์ ๋ฌํฉ๋๋ค.

```js
// fetch random meal from API
async function onGetRandomMeal() {
  mealEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const data = await res.json();

  const meal = data.meals[0];

  addMealToDOM(meal);
}

randomBtn.addEventListener('click', onGetRandomMeal);
```

<br />

## 3.3. Fetching Items by ID

![meal-id](https://user-images.githubusercontent.com/90844424/211146949-1fab15c2-265f-41c9-b535-770ec3f8e31b.jpg)

์๋ณธ ์ฝ๋๋ div.meal-info์ ๋ฐ์ดํฐ ์์ฑ์ ๋ถ์ฌ mealID๋ฅผ ์ฐพ๋ ๋ฐฉ์์ ์ฌ์ฉํ์ผ๋, div.meal-info๊ฐ ์๋ ์ด๋ฏธ์ง๋ฅผ ํด๋ฆญํ์ ๋ ์ ๋ณด๋ฅผ ์ป์ ์ ์๋ ๋ฌธ์ ๊ฐ ์์์ต๋๋ค.

๊ทธ๋์ onGetMeal ํจ์๋ฅผ ๋ง๋ค์ด div.meal ์๋ ๋จผํธ์ `data-mealId="${meal.idMeal}"`๋ฅผ ๋ถ์ฌํ๊ณ , event target์ ๋ถ๋ชจ๋ธ๋๋ฅผ ์ฐพ์ ๊ฐ๋ณ mealID๋ฅผ ์ป๋๋ก ํ์ต๋๋ค. ์ฐพ์ mealID๋ ๋น๋๊ธฐ ํจ์์ธ getMealByID๋ก ์ ๋ฌ๋์ด ํ๋์ ๋ ์ํผ๊ฐ ํ๋ฉด์ ๋ํ๋๊ฒ ๋ฉ๋๋ค.

```js
// Fetch meal by ID
async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();
  const meal = data.meals[0];
  addMealToDOM(meal);
}

// Get Meal with data attribute
function onGetMeal(event) {
  const mealID = event.target.parentNode.getAttribute('data-mealid');

  if (mealID) {
    getMealById(mealID);
  }
}

mealsEl.addEventListener('click', onGetMeal);
```

<br />

## 3.4. Get Detailed Recipes to Paint DOM

![meal-detail](https://user-images.githubusercontent.com/90844424/211174748-e0fbb8e4-902b-4978-9186-bff658763a4e.gif)

๋ ์ํผ ํ์ด์ง์์๋ ์์์ ์ด๋ฏธ์ง, ์ฌ๋ฃ, ์ง์ญ, ์นดํ๊ณ ๋ฆฌ ๋ฑ ์์ธํ ์ ๋ณด๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค. ๋น์ทํ ๋ฐ์ดํฐ๋ฅผ ๋ฌถ์ด์ฃผ๊ธฐ ์ํด mealObj ์ค๋ธ์ ํธ๋ฅผ ๋ง๋ค์ด ๊ฐ๊ฐ์ ์ฌ๋ฃ์ ๊ณ๋ ์ ๋ณด๋ฅผ ์์ผ๋ก ๋ฃ์ด์คฌ์ต๋๋ค. ํด๋น ๋ฐ์ดํฐ๊ฐ ๋ด๊ธด array๋ฅผ mappingํ์ฌ HTML๋ก ์ถ๋ ฅํ์ต๋๋ค.

```js
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
```

<br/>
<br/>

# 4. UI/UX

## 4.1. Design Concept

![meal-design](https://user-images.githubusercontent.com/90844424/211174959-9b9168ec-bce3-4a71-8c80-6f032ccf2e10.jpg)

ํ ๋จธ๋์ ๋ ์ํผ๋ผ๋ ์ปจ์์ผ๋ก ๊ธฐํํ๊ณ , ๋ ์ํผ๋ถ ๋๋์ผ๋ก ๋์์ธํ์ต๋๋ค.
์ฌ์ฉ์์๊ฒ ์์ธํ ์ ๋ณด๋ฅผ ์ ๋ฌํ๊ธฐ ์ํด ์ง์ญ๊ณผ ์นดํ๊ณ ๋ฆฌ ๋ฐ์ดํฐ๋ฅผ ์ฐ์ธก ์๋จ์ ํ์ํ์ต๋๋ค.

<br />

## 4.2. Responsive App Design

![meal-res](https://user-images.githubusercontent.com/90844424/211175327-3a6bdb75-6990-4b80-af63-4286a30bbebc.gif)

![meal-device](https://user-images.githubusercontent.com/90844424/211175278-2fb59561-56d5-4a0c-9d4e-d9510ab34629.jpg)

๋ถํ์ํ ํ์ด์ง ์ ํ์ ํผํ๊ณ ์ ์ฑ๊ธํ์ด์ง ์ฑ์ผ๋ก ๋ง๋ค์์ผ๋ฉฐ ๋ค์ํ ๋๋ฐ์ด์ค์ ๋ฐ์ํ์ผ๋ก ์๋ํฉ๋๋ค.

```css
@media screen and (max-width: 780px) {
  .container {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    border-radius: 0;
  }

  header h1 {
    display: none;
  }

  form {
    width: 100%;
  }

  .meals {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .meals {
    grid-template-columns: 1fr;
  }

  .meal-item {
    padding: 0;
  }

  .meal-item img {
    width: 200px;
  }

  .item-subtitle {
    display: none;
  }

  .item-info ul li {
    font-size: 10px;
  }

  .item-instruction {
    font-size: 14px;
  }
}
```

<br />
<br />

<sub><sup>๋ณธ ์ ํ๋ฆฌ์ผ์ด์์ ์ธํฐ๋ท ๊ฐ์๋ฅผ ์ฐธ๊ณ ํ์ฌ ๋ง๋ค์์ผ๋, ํ์ํ๋ค ์๊ฐ๋๋ ๋ถ๋ถ์์ ์๋ณธ ์ฝ๋๋ฅผ ์์ ํ๊ณ , ๊ธฐ๋ฅ์ ๋ณด์ํ์ต๋๋ค.</sup></sub>
