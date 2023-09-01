// create var for html elements on page

// search form
var searchForm = document.getElementById("searchForm");
// search input field
var searchInput = document.getElementById("searchInput");
// searchbutton
var searchButton = document.getElementById("searchButton");
// displaySect
var displayArtCards = document.getElementById("displayArtContainer");
// main hero image
var heroImage = document.getElementById("mainImage");
// favoritesPage
//var favPageLink = document.getElementById('')

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

  // fetch the Art Institute API for art ID
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        //var imageId = data.
        var altText = data.data[i].thumbnail.alt_text;
        // fetch the artwork image id to construct the image url
        fetch(data.data[i].api_link)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            renderDispCard(data, altText);
          });
      }
    });
}

// define function to construct image URL
function getImageSrc(imageId) {
  var imgUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  return imgUrl;
}

// define function to render images in display card
function renderDispCard(data, altText) {
  // hide the main hero page
  //   heroImage.classList.add("hidden");
  //   displayArtCards.innerHTML = "";
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
  titleYear.textContent = `${data.data.title}     ${data.data.date_end}`;
  artistName.textContent = data.data.artist_title;
  artInfo.textContent = altText;

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

// add function for favorite page
function favoritePage() {
  window.location.assign("./favorite.html");
}

//Event listener for button click
searchForm.addEventListener("submit", getArt);
//favPageLink.addEventListener('click', favoritePage)

function init() {
  heroImage.src = "./assets/Van_Gogh_Starry_Night.jpg";
}

init();
