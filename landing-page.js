// create var for elements on page

// searchfield
var searchForm = document.getElementById('searchForm')
// searchbutton
var searchButton = document.getElementById('searchButton')
// displaySect
var displayArtCards = document.getElementById('')
// favoritesPage
var favPageLink = document.getElementById('')


//write API function
function getArt(e){
    e.preventDefault()
    var searchTerm = searchForm.value
    
    var requestUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`
    
    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            for(var i = 0; i < data.length; i++){

                //var imageId = data.
                var displayCard = document.createElement('div')
                var resultImage = document.createElement('img')
                var discSect = document.createElement('p')
                var favButton = document.createElement('button')

                getImageSrc(imageId)
                discSect.textContent = data.

                displayCard.append(resultImage, resultImage, discSect, favButton)
                displayArtCards.append(displayCard)



            }
        })
}

function getImageSrc(imageId){
    
    var imgId = imageId
    
    var imgUrl = `https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`


}

function favoritePage(){
    window.location.assign("./favorite.html")

}

//Event listener for button click
searchForm.addEventListener('submit', getArt)
favPageLink.addEventListener('click', favoritePage)
