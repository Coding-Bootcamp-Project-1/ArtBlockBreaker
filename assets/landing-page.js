// define variables for the HTML elements

var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var displayArtCards = document.getElementById("displayArtContainer");
var heroImage = document.getElementById("mainImage");

// define global variables
var favoriteArtworkID;

// define initation function
function init() {
  heroImage.src = "./assets/Van_Gogh_Starry_Night.jpg";
}

//write API function for the getting the art images
function getArt(e) {
  // prevent default for form
  e.preventDefault();

  // hide hero image
  heroImage.classList.add("hidden");
  // clear the display container
  displayArtCards.innerHTML = "";

  // construct ART Institute APR URL
  var searchTerm = searchInput.value;
  var requestUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&size=10`;

  //clear search field
  searchInput.value = "";

  // fetch the Art Institute API for art ID
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        // fetch the artwork image id to construct the image url
        fetch(data.data[i].api_link)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log("2nd fetch data: ", data);
            renderDispCard(data);
          });
      }
    });
}

// define function to render images in display card
function renderDispCard(data) {
  //create HTML element for the display card
  var displayCard = document.createElement("div");
  var cardImage = document.createElement("div");
  var resultImage = document.createElement("img");
  var favButton = document.createElement("button");
  var cardDescription = document.createElement("div");
  var titleYear = document.createElement("h3");
  var artistName = document.createElement("p");
  var artInfo = document.createElement("p");

  var imageUrl = getImageSrc(data.data.image_id);

  //add values or attributes to the HTML elements
  resultImage.src = imageUrl;
  favButton.textContent = "Add to Favorite";
  favButton.dataset.index = data.data.id;
  titleYear.textContent = `${data.data.title}     ${data.data.date_end}`;
  artistName.textContent = data.data.artist_title;
  artInfo.textContent = data.data.thumbnail.alt_text;
  // console.log('alt text from disp function: ', altText)

  //add CSS class to the HTML element;
  displayCard.classList.add("displayCard");
  cardImage.classList.add("cardImage");
  resultImage.classList.add("searchResultImage");
  favButton.classList.add("favoriteButton");
  cardDescription.classList.add("description");
  titleYear.classList.add("artName");
  artistName.classList.add("artistName");
  artInfo.classList.add("artInfo");

  // append the element to the parent html element
  cardImage.append(resultImage, favButton);
  cardDescription.append(titleYear, artistName, artInfo);
  displayCard.append(cardImage, cardDescription);
  displayArtCards.append(displayCard);
}

// define function to construct image URL
function getImageSrc(imageId) {
  var imgUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  return imgUrl;
}

// define function to add favorite artwork to a favorite Array
function addFavorite(e) {
  console.log(e.target);
  if (e.target.tagName === "BUTTON") {
    if (localStorage.getItem("Favorite Artwork ID")) {
      favoriteArtworkID = JSON.parse(
        localStorage.getItem("Favorite Artwork ID")
      );
      if (favoriteArtworkID.includes(e.target.dataset.index)) return;
    } else {
      favoriteArtworkID = [];
    }

    // push the favorite image id into the array
    favoriteArtworkID.push(e.target.dataset.index);
    localStorage.setItem(
      "Favorite Artwork ID",
      JSON.stringify(favoriteArtworkID)
    );
  }
}

// add event listener for form submit
searchForm.addEventListener("submit", getArt);

// add event listener for the favorite button
displayArtCards.addEventListener("click", addFavorite);

init();
