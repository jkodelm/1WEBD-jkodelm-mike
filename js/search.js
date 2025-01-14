/* Si click enter avec search bar on focus, SEARCH,
AJOUTER SEARCH DANS URL, si dans url quand load, affichier, sinon quand back vec téléphone, enlève search.
padding
Icon load faster w/ button?*/

let navSearch, navSearchInput, navSearchBtn
const searchDeployed = false

function deploySearch () {
    navSearch.classList.add(nav-search-deployed)

    let backBtn = document.createElement('div');
    backBtn.classList.add('icon');
    backBtn.classList.add('i-left');
    backBtn.addEventListener('click', () => {
        backBtn.remove()
        undeploySearch(navSearch, navSearchInput, backBtn)
    })
    navSearchInput.insertAdjacentElement('beforebegin', backBtn)
    navSearchInput.style.flex = '1'
    navSearchInput.focus();
}

function undeploySearch () {
    navSearch.style.width = 'auto'
    navSearch.style.backgroundColor = 'inherit';
    navSearch.style.position = 'block';

    navSearchInput.style.flex = 'none'
    navSearchInput.style.display = 'initial';

    navSearch.style.cssText = ""
    navSearchInput.style.cssText = ""
}

function main() {
    navSearch = document.querySelector('.nav-search')
    navSearchInput = document.querySelector('#nav-search-input')
    navSearchBtn = document.querySelector('#nav-search-button')
    navSearchBtn.addEventListener('click', () => {
        navSearchBtn.removeEventListener('click', () => {})
        deploySearch()
    })
    window.onresize = () => {
        if (searchDeployed && window.innerWidth > 480) {
            undeploySearch()
        }
    }
}

window.onload = main