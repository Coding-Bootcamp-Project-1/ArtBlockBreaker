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
  e.preventDefault();
  var searchTerm = searchInput.value;
  var requestUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`;

  // fetch the Art Institute API for art ID
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        //var imageId = data.
        //create HTML element for the display card
        var displayCard = document.createElement("div");
        var resultImage = document.createElement("img");
        var discSect = document.createElement("p");
        var favButton = document.createElement("button");
        // fetch the artwork image id to construct the image url
        fetch(data.data[i].api_link)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            var imageUrl = getImageSrc(data.data.image_id);
            resultImage.src = imageUrl;
          });

        // discSect.textContent = data.
        // append the element to the parent html element
        displayCard.append(resultImage, discSect, favButton);
        displayArtCards.append(displayCard);
      }
    });
}

// define the function to construct image URL
function getImageSrc(imageId) {
  var imgUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  return imgUrl;
}

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
