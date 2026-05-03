import { refs } from './refs';

export function renderCategories(categories) {
  const markup = [
    `<li>
     <button class="category-btn active" data-id="all" data-category="all">
       Всі товари
     </button>
   </li>`,
    ...categories.map(
      cat => `
     <li>
       <button class="category-btn"
               data-id="${cat._id}"
               data-category="${cat.name}">
         ${cat.name}
       </button>
     </li>
   `
    ),
  ].join('');
  refs.categories.innerHTML = markup;
}

const colorMap = {
  Cірий: '#c7c3bb',
  Жовтий: '#c7aa80',
  Чорний: '#201a19',
};

export function renderFurniture(list) {
  const markup = list
    .map(item => {
      const colors = (item.colors || item.color || []).slice(0, 3);
      return `
     <li class="furniture-card" data-id="${item._id}">
       <img src="${item.images?.[0]}" alt="${item.name}">
       <h3 class="furniture-name">${item.name}</h3>
       <div class="color-list">
         ${colors
           .map(
             color => `
           <span
             class="color-dot"
             style="background:${colorMap[color] || color}"
             title="${color}"
           ></span>
         `
           )
           .join('')}
       </div>
       <p class="furniture-price">${item.price} грн</p>
       <button class="details-btn">Детальніше</button>
     </li>
   `;
    })
    .join('');
  refs.furnitureList.insertAdjacentHTML('beforeend', markup);
}
