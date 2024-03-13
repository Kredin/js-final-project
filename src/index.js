document.addEventListener("DOMContentLoaded", () => {
  initialise();
  addEventListeners();
});

function initialise() {
  const buySellArea = document.querySelector("#buy-or-sell");
  buySellArea.innerHTML = "";
  let div = document.createElement("div");
  div.setAttribute("id", "cards");
  buySellArea.append(div);

  fetch("http://localhost:3000/0")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((car) => {
        createCards(car);
      })
    );
}

function createCards(car) {
  const cardsArea = document.querySelector("#cards");
  let div = document.createElement("div");
  div.setAttribute("class", "card");

  let img = document.createElement("img");
  img.setAttribute("src", car.image);

  let h2Name = document.createElement("h2");
  h2Name.textContent = car.name;

  let uldiv = document.createElement("div");
  uldiv.setAttribute("id", "ul-div");

  let ul1 = document.createElement("ul");
  let liKm = document.createElement("li");
  liKm.textContent = `${car.kms}kms`;
  let liType = document.createElement("li");
  liType.textContent = car.type;
  ul1.append(liKm, liType);

  let ul2 = document.createElement("ul");
  let liTrans = document.createElement("li");
  liTrans.textContent = car.transmission;
  let liFuel = document.createElement("li");
  liFuel.textContent = car.fuel;
  ul2.append(liTrans, liFuel);

  uldiv.append(ul1, ul2);

  let h2Price = document.createElement("h2");
  h2Price.textContent = `$${car.price}`;

  let btn = document.createElement("button");
  btn.textContent = "View Details";
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    viewDetails(car);
  });

  div.append(img, h2Name, uldiv, h2Price, btn);
  cardsArea.append(div);
}

function addEventListeners() {
  const sellBtn = document.querySelector("#sell-button");
  sellBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createSellForm();
  });

  const buyBtn = document.querySelector("#buy-button");
  buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    initialise();
  });

  const filterBtn = document.querySelector("#filter-submit");
  filterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchCars();
  });
}

function createSellForm() {
  const buySellArea = document.querySelector("#buy-or-sell");
  buySellArea.innerHTML = "";
  let div = document.createElement("div");
  div.setAttribute("class", "sale-form");

  let h2Title = document.createElement("h2");
  h2Title.textContent = "Sales Form";

  let form = document.createElement("form");
  form.setAttribute("action", "submit");

  let imgLabel = document.createElement("label");
  imgLabel.textContent = "Image Url: ";
  imgLabel.setAttribute("for", "img-input");

  let imgInput = document.createElement("input");
  imgInput.setAttribute("type", "text");
  imgInput.setAttribute("id", "img-input");

  let nameLabel = document.createElement("label");
  nameLabel.textContent = "Car Name: ";
  nameLabel.setAttribute("for", "name-input");

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name-input");

  let kmsLabel = document.createElement("label");
  kmsLabel.textContent = "Kms: ";
  kmsLabel.setAttribute("for", "kms-input");

  let kmsInput = document.createElement("input");
  kmsInput.setAttribute("type", "number");
  kmsInput.setAttribute("id", "kms-input");

  let typeLabel = document.createElement("label");
  typeLabel.textContent = "Type: ";
  typeLabel.setAttribute("for", "type-input");

  let typeInput = document.createElement("input");
  typeInput.setAttribute("type", "text");
  typeInput.setAttribute("id", "type-input");

  let transmissionLabel = document.createElement("label");
  transmissionLabel.textContent = "Transmission Type: ";
  transmissionLabel.setAttribute("for", "transmission-input");

  let transmissionInput = document.createElement("input");
  transmissionInput.setAttribute("type", "text");
  transmissionInput.setAttribute("id", "transmission-input");

  let fuelLabel = document.createElement("label");
  fuelLabel.textContent = "Fuel Type: ";
  fuelLabel.setAttribute("for", "fuel-input");

  let fuelInput = document.createElement("input");
  fuelInput.setAttribute("type", "text");
  fuelInput.setAttribute("id", "fuel-input");

  let priceLabel = document.createElement("label");
  priceLabel.textContent = "Price: ";
  priceLabel.setAttribute("for", "price-input");

  let priceInput = document.createElement("input");
  priceInput.setAttribute("type", "number");
  priceInput.setAttribute("id", "price-input");

  let descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Car Description: ";
  descriptionLabel.setAttribute("for", "description-input");

  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("id", "description-input");

  let btn = document.createElement("button");
  btn.textContent = "Post Car";
  btn.setAttribute("type", "submit");
  btn.setAttribute("id", "sell-submit");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    submitSalesForm();
    form.reset();
  });

  form.append(
    imgLabel,
    imgInput,
    nameLabel,
    nameInput,
    kmsLabel,
    kmsInput,
    typeLabel,
    typeInput,
    transmissionLabel,
    transmissionInput,
    fuelLabel,
    fuelInput,
    priceLabel,
    priceInput,
    descriptionLabel,
    descriptionInput,
    btn
  );
  div.append(h2Title, form);
  buySellArea.append(div);
}

function submitSalesForm() {
  const img = document.querySelector("#img-input").value;
  const carName = document.querySelector("#name-input").value;
  const kmAmount = document.querySelector("#kms-input").value;
  const bodyType = document.querySelector("#type-input").value;
  const trans = document.querySelector("#transmission-input").value;
  const fuelType = document.querySelector("#fuel-input").value;
  const priceAmount = document.querySelector("#price-input").value;
  const descr = document.querySelector("#description-input").value;

  fetch("http://localhost:3000/0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: img,
      name: carName,
      kms: kmAmount,
      type: bodyType,
      transmission: trans,
      fuel: fuelType,
      price: priceAmount,
      description: descr,
    }),
  });
}

function viewDetails(car) {
  const buySellArea = document.querySelector("#buy-or-sell");
  buySellArea.innerHTML = "";

  let div = document.createElement("div");
  div.setAttribute("class", "detail-card");

  let img = document.createElement("img");
  img.setAttribute("src", car.image);

  let h2Name = document.createElement("h2");
  h2Name.textContent = car.name;

  let uldiv = document.createElement("div");
  uldiv.setAttribute("id", "ul-div");

  let ul1 = document.createElement("ul");
  let liKm = document.createElement("li");
  liKm.textContent = `${car.kms}kms`;
  let liType = document.createElement("li");
  liType.textContent = car.type;
  ul1.append(liKm, liType);

  let ul2 = document.createElement("ul");
  let liTrans = document.createElement("li");
  liTrans.textContent = car.transmission;
  let liFuel = document.createElement("li");
  liFuel.textContent = car.fuel;
  ul2.append(liTrans, liFuel);

  uldiv.append(ul1, ul2);

  let details = document.createElement("p");
  details.textContent = car.description;

  let h2Price = document.createElement("h2");
  h2Price.textContent = `$${car.price}`;

  let btn = document.createElement("button");
  btn.textContent = "Buy Now";
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    buyCar(car);
  });

  div.append(img, h2Name, uldiv, details, h2Price, btn);
  buySellArea.append(div);
}

function buyCar(car) {
  fetch(`http://localhost:3000/0/${car.id}`, { method: "DELETE" });
}

function fetchCars() {
  fetch("http://localhost:3000/0")
    .then((res) => res.json())
    .then((data) => filterCars(data));
}

function filterCars(cars) {
  const buySellArea = document.querySelector("#buy-or-sell");
  buySellArea.innerHTML = "";
  let div = document.createElement("div");
  div.setAttribute("id", "cards");
  buySellArea.append(div);

  const typeSelect = document.querySelector("#type-select").value;
  let minPrice = document.querySelector("#min-price").value;
  let maxPrice = document.querySelector("#max-price").value;

  if (minPrice === "") {
    minPrice = 0;
  }

  if (maxPrice === "") {
    maxPrice = 9999999;
  }

  const typeFiltered = cars.filter((car) => {
    if (typeSelect === "Any") {
      return car;
    } else {
      return car.type === typeSelect;
    }
  });

  const priceFiltered = typeFiltered.filter((car) => {
    return car.price >= minPrice && car.price <= maxPrice;
  });

  priceFiltered.forEach((car) => {
    createCards(car);
  });
}
