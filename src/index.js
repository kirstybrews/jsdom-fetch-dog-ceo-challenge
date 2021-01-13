console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", function() {
    // console.log("Hello, World.")
    dogData()
    dogBreeds()
})

function dogData() {
    fetch(imgUrl) 
        .then((res) => res.json() )
        .then(dog => displayDogImage(dog.message))
}

function dogBreeds() {
    fetch(breedUrl) 
        .then((res) => res.json() )
        .then(dog => {
            displayDogBreed(dog.message)
            filterBreeds(dog.message)
        })
}

function displayDogImage(dogImages) {
    let imageContainer = document.querySelector('#dog-image-container')
    dogImages.forEach(function(image) {
        let img = document.createElement('img')
            img.src = image
        imageContainer.appendChild(img)
    })
}

function displayDogBreed(dogBreeds) {
    let uList = document.querySelector('#dog-breeds')
    uList.innerHTML = ""
    
    // let breeds = Object.keys(dogBreeds)
    // console.log(breeds)
    for (let breed in dogBreeds) {
        console.log(breed, dogBreeds[breed]);
        let listItem = document.createElement('li')
        listItem.innerText = breed
        dogBreeds[breed].forEach(function(extraBreed) {
            let nestedUl = document.createElement('ul')
            let extraListItem = document.createElement('li')
            extraListItem.innerText = extraBreed
            nestedUl.appendChild(extraListItem)
            listItem.appendChild(nestedUl)
            // debugger
        })
        uList.appendChild(listItem)
        listItem.addEventListener("click", event => { 
            event.target.style = "color: red"
        })
        }
    
}

function filterBreeds(dogBreeds) {
    const dropdown = document.querySelector('#breed-dropdown')
    dropdown.addEventListener('change', event => {
        let letterChosen = dropdown.value
        letterSelector(letterChosen, dogBreeds)
    })
}

function letterSelector(letterChosen, dogBreeds) {
    const filteredBreeds = {};
    for (let breed in dogBreeds) {
        if (breed.charAt(0) == letterChosen) {
            filteredBreeds[breed] = dogBreeds[breed]
        }
        // console.log(breed.charAt(0))

    }
    displayDogBreed(filteredBreeds)
}