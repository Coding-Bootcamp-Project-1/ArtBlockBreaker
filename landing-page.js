// create var for elements on page

//write API function

function getArt(){
    var requestUrl = 'https://api.artic.edu/api/v1/artworks/search?q= ${PLACEHOLDER}'
    
    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data)){
            console.log(data)

        }
}


//Event listener for button click

