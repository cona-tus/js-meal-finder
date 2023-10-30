# 🍪 레시피 검색 앱, 'Nana's Recipes' 토이프로젝트

![meal-thumb](https://user-images.githubusercontent.com/90844424/211139993-6fd9d765-7ce3-411b-80cd-a643b52f538d.jpg)

<br/>

🔗 Nana's Recipes [[Live Demo](https://conatus-js-meal-finder.netlify.app/)]

<br/>
<br/>

## 1. Project

### 1-1. Project Information

본 프로젝트는 자바스크립트를 사용해 만든 레시피 검색 애플리케이션입니다. [TheMealDB](https://www.themealdb.com/ 'TheMealDB')에서 제공하는 음식 데이터 API를 기반으로 제작하였습니다. 사용자가 검색어를 입력하면 해당 키워드를 포함한 목록이 나타나며, 목록 중 하나를 클릭하면 해당 아이템의 상세 정보를 확인할 수 있습니다. 또한 특정 키워드를 입력하지 않고 랜덤한 레시피를 받을 수도 있습니다.

<br/>

<sub>\* 본 애플리케이션은 인터넷 강의를 참고하여 만들었으나, 필요하다고 판단되는 부분에서 원본 코드를 수정했습니다. 또한 새롭게 디자인했습니다.</sub>

<br/>

### 1-2. Project Duration & Participants

- 2023-1-7 ~ 2023-1-7
- 개인 프로젝트 (1인)

<br/>
<br/>

## 2. Skills

![HTML](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff) ![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

## 3. Main Features

1. [키워드로 레시피 검색]()
2. [랜덤 레시피]()
3. [아이템 받아오기]()
4. [세부 정보 받아오기]()

<br/>

### 3-1. Searching Recipes by Keywords

![meal-search](https://user-images.githubusercontent.com/90844424/211146022-3259f4e5-1214-4799-9c86-597e5f454e4a.gif)

TheMealDB API를 활용하여 키워드로 검색이 가능합니다. 검색창에 입력한 값을 term 변수에 할당하고, fetch할 URL에 해당 값을 넣어줬습니다. 검색 결과는 div.mealsEl의 innerHTML을 수정하여 div.meal을 추가하였습니다.

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

<br/>
<br/>

### 3-2. Fetching Random Recipes

![meal-random](https://user-images.githubusercontent.com/90844424/211146742-a39bed13-d902-48c1-8a6c-234a8089608d.gif)

TheMealDB API를 통해 하나의 레시피를 상세하게 살펴볼 수 있습니다. meal 데이터를 DOM에 추가하는 함수 `addMealToDOM()`에 전달합니다.

```js
// Fetch random meal from API
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

<br/>
<br/>

### 3-3. Fetching Items by ID

![meal-id](https://user-images.githubusercontent.com/90844424/211146949-1fab15c2-265f-41c9-b535-770ec3f8e31b.jpg)

원본 강의 코드에서는 div.meal-info에 데이터 속성을 붙여 mealID를 찾는 방식을 사용했습니다. 그러나 div.meal-info가 아닌 이미지를 클릭했을 때 정보를 얻을 수 없는 문제가 있었습니다.

```js
<div class='meal' data-mealId='${meal.idMeal}'>
  <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
  <div class='meal-info'>
    <h3>${meal.strMeal}</h3>
  </div>
</div>
```

<br/>

그래서 `onGetMeal()` 함수를 만들어 div.meal 요소에 `data-mealId="${meal.idMeal}"`를 부여했고, event target의 부모 노드를 찾아 개별 mealID를 얻도록 했습니다. 찾은 mealID는 비동기 함수인 getMealByID 함수로 전달되어 하나의 레시피가 화면에 나타나게 됩니다.

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

<br/>
<br/>

### 3-4. Get a Detailed recipe

![meal-detail](https://user-images.githubusercontent.com/90844424/211174748-e0fbb8e4-902b-4978-9186-bff658763a4e.gif)

레시피 페이지에서는 음식의 이미지, 재료, 지역, 카테고리 등 자세한 정보를 확인할 수 있습니다. 비슷한 데이터를 묶어주기 위해 mealObj 오브젝트를 만들어 각각의 재료와 계량 정보를 쌍으로 넣어주었습니다. 해당 데이터가 담긴 배열을 매핑하여 HTML로 출력했습니다.

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

## 4. UI/UX

### 4-1. Design Concept

![meal-design](https://user-images.githubusercontent.com/90844424/211174959-9b9168ec-bce3-4a71-8c80-6f032ccf2e10.jpg)

할머니의 레시피라는 컨셉으로 기획하고, 레시피북 느낌으로 디자인했습니다. 사용자에게 자세한 정보를 전달하기 위해 지역과 카테고리 데이터를 우측 상단에 표시했습니다.

<br/>
<br/>

### 4-2. Responsive Web Design

![meal-device](https://user-images.githubusercontent.com/90844424/211175278-2fb59561-56d5-4a0c-9d4e-d9510ab34629.jpg)

불필요한 페이지 전환을 최소화하기 위해 싱글 페이지 앱으로 개발되었습니다. 또한 반응형으로 제작되어 다양한 디바이스 환경에서 이용할 수 있습니다.

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

<br/>
<br/>

[맨위로 이동하기](#-레시피-검색-앱-nanas-recipes-토이프로젝트)
