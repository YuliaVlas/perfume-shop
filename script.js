const items = [
    {
      title: "Lanvin Marry Me",
      description: "Marry Me! — аромат любви и первого свидания, романтический и чувственный, как эликсир счастья!",
      tags: ["весна", "зима"],
      price: 100,
      img: "./img/1.jpg",
      rating: 5,
    },
    {
      title: "S. Ferragamo Signorina Libera",
      description: "Яркий и утонченный, аромат LIBERA представляет собой продолжение легендарной парфюмерной линии SIGNORINA",
      tags: ["весна", "лето"],
      price: 180,
      img: "./img/2.jpg",
      rating: 4,
    },
    {
      title: "Guerlain Mon Guerlain Sparkling Bouquet",
      description: "Искристый, наполненный жизнью аромат из нот груши, лаванды и ванили!",
      tags: ["весна"],
      price: 300,
      img: "./img/3.jpg",
      rating: 5,
    },
    {
      title: "Gucci Flora by Gucci edp",
      description: "Flora by Gucci Eau de Parfum — манящий цветочный аромат для милых дам! Аромат относится к типу цветочных.",
      tags: ["зима", "весна"],
      price: 350,
      img: "./img/4.jpg",
      rating: 4.7,
    },
    {
      title: "Baldessarini Ambre",
      description: "Композиция насыщена амбровыми, древесными, фруктовыми аккордами, что бы продемонстрировать все грани мужской натуры – жесткость и решительность, доброту и щедрость.",
      tags: ["зима", "осень"],
      price: 130,
      img: "./img/5.jpg",
      rating: 4.9,
    },
    {
      title: "Calvin Klein Euphoria Men Intense",
      description: "Аромат Intense Euphoria Men для современных мужчин, смелых и самоотверженных, ищущих опасные приключения!",
      tags: ["зима", "весна", "лето"],
      price: 150,
      img: "./img/6.jpg",
      rating: 4.8,
    },
    {
      title: "Trussardi My Land",
      description: "Trussardi My Land — очень выразительный, эмоциональный, притягательный, гармоничный аромат.",
      tags: ["зима", "осень"],
      price: 155,
      img: "./img/7.jpg",
      rating: 4.9,
    },
    {
      title: "Chanel Bleu de Chanel Eau de Parfum",
      description: "Довольно свежий, древесный и слегка пряный с оттенком кислинки. в конце начинают пахнуть кедром, гаитянский ветивер и ваниль. ",
      tags: ["осень"],
      price: 475,
      img: "./img/8.jpg",
      rating: 4.4,
    },
  ];
  
  // Товары после применения поиска / фильтров
  // которые мы будем показывать пользователю
  let currentState = [...items];
  
  // Переменная с контейнером для товаров
  const itemsContainer = document.querySelector("#shop-items");
  // Шаблон для товара
  const itemTemplate = document.querySelector("#item-template");
  // Текст, если ничего не найдено
  const nothingFound = document.querySelector("#nothing-found");
  
  // Функция для отрисовки
  // В качестве параметра — товары, которые нужно отрисовать
  function renderItems(arr) {
    // Сбрасываем текст "Ничего не найдено" после предыдущего поиска
    nothingFound.textContent = "";
    // И чистим контейнер с товарами на случай, если там что-то было
    itemsContainer.innerHTML = "";
    // Отрисовываем товары из переданного параметра arr
    arr.forEach((item) => {
      // Вызываем prepareShopItem для каждого товара
      // И подставляем результат в верстку
      itemsContainer.append(prepareShopItem(item));
    });
    // Если массив товаров пустой, отображаем текст, что ничего не нашлось
    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  
  // Функция-хелпер для сортировки товаров по алфавиту
  function sortByAlphabet(a, b) {
    // Смотрим на свойство title
    // Если title первого товара алфавитно больше второго...
    if (a.title > b.title) {
      return 1;
    }
    // Если title второго товара больше
    if (a.title < b.title) {
      return -1;
    }
    // Если они равны
    return 0;
  }
  
  // Вызываем функцию для отрисовки в самом начале
  // И тут же сортируем по алфавиту
  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  // Функция для создания верстки конкретного товара
  function prepareShopItem(shopItem) {
    // Деструктурируем свойства объекта
    const { title, description, tags, img, price, rating } = shopItem;
    // Берем за основу шаблон товара
    const item = itemTemplate.content.cloneNode(true);
    // Наполняем его информацией из объекта
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;
  
    // Находим контейнер для рейтинга
    const ratingContainer = item.querySelector(".rating");
    // Рисуем нужное количество звездочек
    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }
  
    // Находим шаблон для тегов
    const tagsHolder = item.querySelector(".tags");
  
    // Отрисовываем теги для товара
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
  
    // Возвращаем HTML-элемент
    return item;
  }
  
  // Инпут для поиска
  const searchInput = document.querySelector("#search-input");
  // Кнопка
  const searchButton = document.querySelector("#search-btn");
  
  // Функция для поиска по товарам (сбрасывает фильтры)
  function applySearch() {
    // Взяли значение инпута и "причесали" его
    // Привели к нижнему регистру, чтобы написание не мешало поиску
    const searchString = searchInput.value.trim().toLowerCase();
  
    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
  }
  
  // Обработчик при клике на кнопку поиска
  searchButton.addEventListener("click", applySearch);
  // Обработчик события поиска при взаимодействии с инпутом
  searchInput.addEventListener("search", applySearch);
  
  // Селект с опциями сортировки
  const sortControl = document.querySelector("#sort");
  // Обработчик события выбора опции из селекта
  sortControl.addEventListener("change", (event) => {
    // Атрибут value опции селекта, что выбрал пользователь
    const selectedOption = event.target.value;
    // В зависимости от вида сортировки упорядочиваем массив товаров
    switch (selectedOption) {
      case "expensive": {
        // Сначала дорогие
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        // Сначала дешевые
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        // От более высокого рейтинга к более низкому
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        // По алфавиту
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    // Массив упорядочили — осталось его отрисовать
    renderItems(currentState);
  });