//Define variable names for HTML elements
var returnBtn = document.getElementById("returnBtnFP");
var wordCloudBtn = document.getElementById("wordCloudBtnFP");
var favDisplayEl = document.getElementById("dispFavContainer");
var wordCloudDisplayEl = document.getElementById("wordCloudContainer");
var wordCloudImage = document.getElementById("wordCloudImage");

//Manually set favorite items list, this will be replaced by future codes to generate favorite list
var favItems = [
  {
    title: "Arrival of the Normandy Train, Gare Saint-Lazare",
    artist_title: "Claude Monet",
    color: {
      h: 6,
      l: 34,
      s: 53,
    },
    term_titles: [
      "painting",
      "Impressionism",
      "oil painting",
      "oil paint (paint)",
      "european painting",
      "painting (image making)",
      "world's fairs",
      "Chicago World's Fairs",
      "Century of Progress",
      "transportation",
      "urban life",
      "landscapes",
    ],
    alt_text:
      "Loosely painted image of an open-air train station. On the right, a parked train gives off an enormous plumb of white smoke, making the scene look as though it were full of clouds. A huddled mass of barely discernible people crowd around the train on both sides of the tracks. Blue, green, and gray tones dominate.",
    imageUrl: ``,
  },
  {
    title: "Branch of the Seine near Giverny (Mist)",
    artist_title: "Claude Monet",
    color: {
      h: 225,
      l: 49,
      s: 12,
    },
    term_titles: [
      "water",
      "weather/seasons",
      "european painting",
      "oil paint (paint)",
      "landscapes",
      "Impressionism",
      "painting",
    ],
    alt_text:
      "Painting of softly rendered shapes in pale blue, green, and white. A textured green mass at left resembles foliage. Blue and white cloud-like forms fill the rest of the frame.",
    imageUrl: ``,
  },
];

//Definal inial values for global objects.
var wordList = [];
var colorList = [];
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

// manually add localstorage favorite item list, this will be replaced by future codes
localStorage.setItem("favItems", JSON.stringify(favItems));

//add remove from favorites function

// define function to show favorites list on page
function renderFavItems() {
  var favToDisplay = JSON.parse(localStorage.getItem("favItems"));
  for (var i = 0; i < favToDisplay.length; i++) {
    //create HTML elements for favorite display card
    var favCard = document.createElement("div");
    var cardImage = document.createElement("div");
    var cardDescription = document.createElement("div");
    var resultImage = document.createElement("img");
    var removeButton = document.createElement("button");
    var artistName = document.createElement("p");
    var imageTitle = document.createElement("p");
    var termTitles = favToDisplay[i].term_titles.toString();

    // add values or attributes to HTML elements
    // resultImage.src = this.imageUrl
    removeButton.textContent = "Remove from Favorites";
    artistName.textContent = favToDisplay[i].artist_title;
    imageTitle.textContent = favToDisplay[i].title;

    //add CSS class to HTML elements

    //append the elements to parent HTML element
    // cardImage.append(resultImage)
    cardDescription.append(imageTitle, artistName, removeButton);
    favCard.append(cardImage, cardDescription);
    favDisplayEl.append(favCard);

    //add to word list for word cloud to apiObject
    wordList += termTitles + ", " + favToDisplay[i].alt_text;
    apiObject.text = wordList;

    //get hex code for color
    var colorCodeH = favToDisplay[i].color.h;
    var colorCodeL = favToDisplay[i].color.l;
    var colorCodeS = favToDisplay[i].color.s;
    var colorFullCode = `${colorCodeH},${colorCodeL},${colorCodeS}`;
    getColor(colorFullCode);

    //add colorlist to the apiObject
    apiObject.colors = colorList;
  }
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

renderFavItems();
wordCloudBtn.addEventListener("click", createWordCloud);
