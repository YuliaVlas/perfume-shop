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
        title: "Gucci Flora by Gucci edp",
        description: "Flora by Gucci Eau de Parfum — манящий цветочный аромат для милых дам! Аромат относится к типу цветочных.",
        tags: ["зима", "весна"],
        price: 250,
        img: "./img/4.jpg",
        rating: 3.7,
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

  let currentState = [...items];
  
  const itemsContainer = document.querySelector("#shop-items");
  const itemTemplate = document.querySelector("#item-template");
  const nothingFound = document.querySelector("#nothing-found");
  
  function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
      itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  
  function sortByAlphabet(a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  }
  
  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} руб.`;
  
    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }
  
    const tagsHolder = item.querySelector(".tags");
  
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
  
    return item;
  }
  
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-btn");
  
  function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
  
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);
    sortControl.selectedIndex = 0;
  }
  
  searchButton.addEventListener("click", applySearch);
  searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        applySearch();
    }
});
  
  const sortControl = document.querySelector("#sort");
  sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    if (currentState.length === 0) return;

    switch (selectedOption) {
      case "expensive": {
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    
    renderItems(currentState);
  });

  const feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
   
    alert('Сообщение отправлено!');
    this.reset();
  });