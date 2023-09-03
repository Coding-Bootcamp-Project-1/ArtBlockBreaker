var returnBtn = document.getElementById('returnBtnFP')
var wordCloudBtn = document.getElementById('wordCloudBtnFP')
var favDisplayEl = document.getElementById('dispFavContainer')
var wordCloudDisplayEl = document.getElementById('wordCloudContainer')
var wordCloudImage = document.getElementById('wordCloudImage')

var favItems = [
    {
        title: "Arrival of the Normandy Train, Gare Saint-Lazare",
        artist_title: "Claude Monet",
        color: {
            h: 6,
            l: 34,
            s: 53
        },
        term_titles: ["painting", "Impressionism", "oil painting", "oil paint (paint)", "european painting", "painting (image making)", "world's fairs", "Chicago World's Fairs", "Century of Progress", "transportation", "urban life", "landscapes"],
        alt_text: "Loosely painted image of an open-air train station. On the right, a parked train gives off an enormous plumb of white smoke, making the scene look as though it were full of clouds. A huddled mass of barely discernible people crowd around the train on both sides of the tracks. Blue, green, and gray tones dominate.",
        imageUrl: `https://www.artic.edu/iiif/2/838d8c33-a3b4-68ea-587b-87ceec2011af/full/843,/0/default.jpg`
    },
    {
        title: "Branch of the Seine near Giverny (Mist)",
        artist_title: "Claude Monet",
        color: {
            h: 225,
            l: 49,
            s: 12
        },
        term_titles: ["water", "weather/seasons", "european painting", "oil paint (paint)", "landscapes", "Impressionism", "painting"],
        alt_text: "Painting of softly rendered shapes in pale blue, green, and white. A textured green mass at left resembles foliage. Blue and white cloud-like forms fill the rest of the frame.",
        imageUrl: `https://www.artic.edu/iiif/2/4d1b3ad0-14db-0d21-ad9f-17abb8bdfbb5/full/843,/0/default.jpg`
    }
]

var wordList = ""
var colorList = []

var apiObject = {
    format: "svg",
    width: 500,
    height: 500,
    fontFamily: "sans-serif",
    fontScale: 15,
    scale: "linear",
    text: wordList,
    colors: colorList}

// add get favorites function
localStorage.setItem("favItems", JSON.stringify(favItems))


// add remove from favorites function

function renderFavItems() {
    var favToDisplay = JSON.parse(localStorage.getItem("favItems"))
    console.log('returned from local storage: ', favToDisplay)
    for (var i = 0; i < favToDisplay.length; i++) {
        //create HTML elements for favorite display card
        var favCard = document.createElement('div')
        var cardImage = document.createElement('div')
        var cardDescription = document.createElement('div')
        var resultImage = document.createElement('img')
        var removeButton = document.createElement('button')
        var artistName = document.createElement('p')
        var imageTitle = document.createElement('p')

        var termTitles = favToDisplay[i].term_titles.toString()

        // add values or attributes to HTML elements
        // resultImage.src = this.imageUrl
        removeButton.textContent = "Remove from Favorites"
        artistName.textContent = favToDisplay[i].artist_title
        imageTitle.textContent = favToDisplay[i].title

        //add CSS class to HTML elements

        //append the elements to parent HTML element
        // cardImage.append(resultImage)
        cardDescription.append(imageTitle, artistName, removeButton)
        favCard.append(cardImage, cardDescription)
        favDisplayEl.append(favCard)
        wordList += termTitles + ", " + favToDisplay[i].alt_text
        console.log(wordList)
    }
}

function createWordCloud () {
    fetch(`https://quickchart.io/wordcloud`,{
        method: "POST",
        body: JSON.stringify(apiObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        responseType: "blob"
})
        .then(function (response) {
            console.log('response', response)
            return response.blob()
        })
        .then(function (data) {
            var wordCloudImageUrl = URL.createObjectURL(data)
            console.log('url', wordCloudImageUrl)
            wordCloudImage.src = wordCloudImageUrl
        })};

renderFavItems()
// createWordCloud()