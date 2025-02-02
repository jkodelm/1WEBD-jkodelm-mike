function main() {

// THEME

const themeBtn = document.querySelector('#theme')
themeBtn.addEventListener('click', changeTheme)

function changeTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const themeIcon = themeBtn.firstElementChild
    themeIcon.backgroundColor = 'red'
    themeIcon.classList.toggle('i-sun')
    themeIcon.classList.toggle('i-moon')
    updateTheme()
}

function updateTheme() {
    
    if (document.body.classList.contains('dark')) {
        document.body.style.backgroundColor = '#222426';
        document.body.style.color = 'white';
        localStorage.setItem('theme', 'dark')
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = 'black';
        localStorage.setItem('theme', './svg/light')
    }
}
document.body.classList.add(localStorage.getItem('theme') || 'dark');
updateTheme()

//VARIABLES

const overlay = document.querySelector('#overlay');

const navSearch = document.querySelector('.nav-search'); // optimize range where it searches it
const navSearchInput = document.querySelector('#nav-search-input');
const navSearchBtn = document.querySelector('#nav-search-button');
const navBackBtn = navSearch.querySelector('.back-btn');
const navSearchResults = document.querySelector('#nav-lower-frame');
let searchDeployed = false;

//OVERLAY

function showOverlay(onClickFunc) {
    overlay.classList.remove('hidden')
    overlay.addEventListener('click', () => {
        onClickFunc()
    })
}

function hideOverlay() {
    overlay.classList.add('hidden')
}

// SEARCHBAR

navSearchBtn.addEventListener('click', () => {
    if (!searchDeployed && window.innerWidth < 480) {
        deploySearch()
    } else {
        console.log('googlisez', navSearchInput.value);
    }
});

navBackBtn.addEventListener('click', undeploySearch);

window.addEventListener('resize', () => {
    if (searchDeployed && window.innerWidth > 480) {
        undeploySearch();
    }
});

function deploySearch() {
    searchDeployed = true;
    navSearch.classList.add('nav-search-deployed');
    navSearch.classList.add('side-padding');
    navBackBtn.classList.remove('hidden');
    navSearchInput.focus();
    showOverlay(undeploySearch);
    toggleNavResults();
};

function undeploySearch() {
    searchDeployed = false;
    navSearch.classList.remove('side-padding');
    navSearch.classList.remove('nav-search-deployed');
    navBackBtn.classList.add('hidden');
    navSearchResults.classList.add('hidden');
    hideOverlay();
};

function toggleNavResults() {
    if (navSearchInput.value === '') {
        navSearchResults.classList.add('hidden');
    } else {
        navSearchResults.classList.remove('hidden'); // remove if positive results. fetch, then verify not empty, then show res.
        console.log('fetching res for', navSearchInput.value);
    }
}

}

document.addEventListener("DOMContentLoaded", main)