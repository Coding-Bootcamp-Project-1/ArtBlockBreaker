//Define variable names for HTML elements
var returnBtn = document.getElementById("returnBtnFP");
var wordCloudBtn = document.getElementById("wordCloudBtnFP");
var favDisplayEl = document.getElementById("dispFavContainer");
var wordCloudDisplayEl = document.getElementById("wordCloudContainer");
var wordCloudImage = document.getElementById("wordCloudImage");
var darkMode = document.getElementById("darkMode");

function changeViewMode() {
  var bodyEl = document.body;
  bodyEl.classList.toggle("darkMode");
}

//Definal inial values for global objects.
var wordList = [];
var colorList = [];
var favoriteArtworkID = [];
var apiObject = {
  format: "svg",
  width: 500,
  height: 500,
  fontFamily: "sans-serif",
  fontScale: 15,
  scale: "linear",
  cleanWords: true,
  colors: "",
  text: "",
};

//add remove from favorites function

// define function to show favorites list on page
function renderFavItems() {
  // var favToDisplay = JSON.parse(localStorage.getItem("favItems"));
  // retrive favorite artwork ID from the localstorage
  favDisplayEl.innerHTML = "";

  var favoriteArtworkID = JSON.parse(
    localStorage.getItem("Favorite Artwork ID")
  );

  for (var i = 0; i < favoriteArtworkID.length; i++) {
    // retrieve all image information from the art institute API using the image id
    var urlImage = `https://api.artic.edu/api/v1/artworks/${favoriteArtworkID[i]}`;
    fetch(urlImage)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        renderFavCard(data);
        //add to word list for word cloud to apiObject
        wordList += data.data.term_titles + ", " + data.data.thumbnail.alt_text;
        apiObject.text = wordList;

        //get hex code for color
        var colorCodeH = data.data.color.h;
        var colorCodeL = data.data.color.l;
        var colorCodeS = data.data.color.s;
        var colorFullCode = `${colorCodeH},${colorCodeL},${colorCodeS}`;
        getColor(colorFullCode);

        //add colorlist to the apiObject
        apiObject.colors = colorList;
      });
  }
}

function renderFavCard(data) {
  //create HTML elements for favorite display card
  var favCard = document.createElement("div");
  var cardImage = document.createElement("div");
  var cardDescription = document.createElement("div");
  var resultImage = document.createElement("img");
  var removeButton = document.createElement("button");
  var artistName = document.createElement("p");
  var imageTitle = document.createElement("p");

  // add values or attributes to HTML elements
  resultImage.src = `https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg`;
  removeButton.textContent = "Remove from Favorites";
  removeButton.dataset.index = data.data.id;
  artistName.textContent = data.data.artist_title;
  imageTitle.textContent = data.data.title;

  //add CSS class to HTML elements
  favCard.classList.add("displayCardFP");
  cardImage.classList.add("favImageDiv");
  cardDescription.classList.add("favImageDescription");
  resultImage.classList.add("favImage");
  imageTitle.classList.add("imageTitle");
  artistName.classList.add("artistName");
  removeButton.classList.add("button");

  //append the elements to parent HTML element
  cardImage.append(resultImage);
  cardDescription.append(imageTitle, artistName);
  favCard.append(cardImage, cardDescription, removeButton);
  favDisplayEl.append(favCard);
}

// define function to get the prominent color code function
function getColor(colorFullCode) {
  var requestUrl = `https://www.thecolorapi.com/id?hsl=${colorFullCode}`;
  // console.log("url", requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      hexColor = data.hex.value;
      colorList.push(hexColor);
    });
}

// define create word cloud function
function createWordCloud() {
  console.log("text passed into wc: ", wordList);
  console.log(typeof wordList.toString());
  console.log("colors passed into wc: ", colorList);
  console.log(apiObject);
  fetch(`https://quickchart.io/wordcloud`, {
    method: "POST",
    body: JSON.stringify(apiObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    responseType: "blob",
  })
    .then(function (response) {
      console.log("response", response);
      return response.blob();
    })
    .then(function (data) {
      var wordCloudImageUrl = URL.createObjectURL(data);
      console.log("url", wordCloudImageUrl);
      wordCloudImage.src = wordCloudImageUrl;
    });
}

// define function for initiation
function init() {
  renderFavItems();
}

// define function to remove artwork from favorite list
function removeFav(e) {
  console.log(e.target);
  if (e.target.tagName === "BUTTON") {
    var favoriteArtworkID = JSON.parse(
      localStorage.getItem("Favorite Artwork ID")
    );
    console.log(favoriteArtworkID);
    const artID = e.target.dataset.index;
    const index = favoriteArtworkID.indexOf(artID);
    favoriteArtworkID.splice(index, 1);
    console.log(favoriteArtworkID);
    localStorage.setItem(
      "Favorite Artwork ID",
      JSON.stringify(favoriteArtworkID)
    );
    renderFavItems();
  }
}

wordCloudBtn.addEventListener("click", createWordCloud);
darkMode.addEventListener("click", changeViewMode);
favDisplayEl.addEventListener("click", removeFav);

init();
