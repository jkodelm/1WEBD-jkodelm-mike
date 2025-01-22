function main() {

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

// THEME

/* function changeTheme() {
    const root = document.documentElement;

    // Map the variables to their new values
    const themeMap = {
        '--font': {
            current: 'white',
            new: 'black'
        },
        '--light': {
            current: '#fff',
            new: 'dark'
        },
        '--light200': {
            current: '#f0f0f0',
            new: 'dark200'
        },
        '--light300': {
            current: '#f8f8f8',
            new: 'dark300'
        },
        '--dark': {
            current: '#2c2e30',
            new: 'light'
        },
        '--dark200': {
            current: '#27292b',
            new: 'light200'
        },
        '--dark300': {
            current: '#222426',
            new: 'light300'
        }
    };

    // Loop through each variable and swap its value
    Object.keys(themeMap).forEach(variable => {
        const styles = getComputedStyle(root);
        const currentValue = styles.getPropertyValue(variable).trim();

        // Check if the current value matches the map, and swap
        if (currentValue === themeMap[variable].current) {
            root.style.setProperty(variable, themeMap[variable].new);
        } else {
            root.style.setProperty(variable, themeMap[variable].current);
        }
    });
} */

function changeTheme() {
    document.body.classList.toggle('light')
    const root = document.documentElement
    const variables = ['--col', '--col200', '--col300', '--font']
    let newTheme = [];
    if (document.body.classList == 'light') {
        newTheme = ['#ffffff', '#f8f8f8', '#f0f0f0', 'black'];
        document.querySelectorAll('.icon').forEach(icon => {
            icon.style.filter = 'brightness(0)';
        });
        //change logo
    } else {
        newTheme = ['#2c2e30', '#27292b', '#222426', 'white'];
        document.querySelectorAll('.icon').forEach(icon => {
            icon.style.filter = 'brightness(0) invert(1)';
        });
    }
    

    for (let i = 0; i < 4; i++) {
        root.style.setProperty(variables[i], newTheme[i]);
    }
    
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

document.querySelector('#theme').addEventListener('click', changeTheme)

}

function storeCurrentMovie(data) {
    localStorage.setItem("currMovie", data)
}
function getStoredMovie() {
    return localStorage.getItem("currMovie")
}

document.addEventListener("DOMContentLoaded", main)