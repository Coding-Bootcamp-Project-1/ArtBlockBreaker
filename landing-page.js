// create var for elements on page

// searchfield
var searchForm = document.getElementById('searchForm')
var searchInput = document.getElementById('searchInput')
// searchbutton
var searchButton = document.getElementById('searchButton')
// displaySect
var displayArtCards = document.getElementById('displayArtContainer')
// favoritesPage
//var favPageLink = document.getElementById('')


//write API function
function getArt(e){
    e.preventDefault()
    var searchTerm = searchInput.value
    
    var requestUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`
    
    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            for(var i = 0; i < data.data.length; i++){

                //var imageId = data.
                var displayCard = document.createElement('div')
                var resultImage = document.createElement('img')
                var discSect = document.createElement('p')
                var favButton = document.createElement('button')
                fetch(data.data[i].api_link)
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){
                        console.log(data)
                        var imageUrl = getImageSrc(data.data.image_id)
                        resultImage.src = imageUrl
                    })
                

               // discSect.textContent = data.

                displayCard.append(resultImage, discSect, favButton)
                displayArtCards.append(displayCard)



            }
        })
}

function getImageSrc(imageId){
    
    
    
    var imgUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`

    return imgUrl
}

function favoritePage(){
    window.location.assign("./favorite.html")

}

//Event listener for button click
searchForm.addEventListener('submit', getArt)
//favPageLink.addEventListener('click', favoritePage)
