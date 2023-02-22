const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');

const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('loader');

//NASA API
const count = 10;
const api_key = 'DEMO_KEY'; //DEMO_KEY
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=${count}`;

let resultsArray = [];
let favorites = {};

//create IMAGE cards
function createDOMNodes(page){
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    console.log('current array', page, currentArray);
    currentArray.forEach((result) => {
        //CARD container
        const card = document.createElement('div');
        card.classList.add('card');
        //Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full image';
        link.targe = '_blank';
        //Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        //Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        //Save Text 
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results'){
            saveText.textContent = 'Add to Favorites';
            saveText.setAttribute('onclick', `saveFavourite('${result.url}')`);
        } else { //its favorites
            saveText.textContent = 'Delete';
            saveText.setAttribute('onclick', `removeFavourite('${result.url}')`);
        } 
        //Card Text 
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        //Footer Container 
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        //Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        //Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;
        //Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}



//Declare each element and then append to DOM
//For each image pulled from NASA API
function updateDOM(page){
    //Get favourites from localStorage
    if (localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    imagesContainer.textContent = ''; //forces an refresh 
    createDOMNodes(page);
}

// add result to Favorites
function saveFavourite(itemUrl){
    //loop through results to select favourites
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item;
            // show save confirmation for 2 seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            // save favourites to localStorage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites) );
        }
    });
}

// remove item from favorites and localstorage
function removeFavourite(itemUrl){
    if (favorites[itemUrl]){
        delete favorites[itemUrl];
        //update
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites) );
        updateDOM('favorites');
    }
}

// Get 10 images from NASA API
async function getNasaPictures(){
    //show loader
    //loader.classList.remove('hidden');
    //retreive the pictures 
    try{
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
        //catch the error here
        console.log(error);
    }
}

// On load
getNasaPictures();
