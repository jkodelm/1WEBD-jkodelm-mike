/* Si click enter avec search bar on focus, SEARCH,
AJOUTER SEARCH DANS URL, si dans url quand load, affichier, sinon quand back vec téléphone, enlève search.
padding
Icon load faster w/ button?*/

let navSearch, navSearchInput, navSearchBtn
let searchDeployed = false

function search() {
    if (!searchDeployed && window.innerWidth < 480) {
        navSearchBtn.removeEventListener('click', search);
        deploySearch()
    } else {
        console.log('recherche',navSearchInput.value,'sur google')
    }
    
}

function deploySearch () {
    searchDeployed = true
    navSearch.classList.add('nav-search-deployed')

    let backBtn = document.createElement('div');
    backBtn.classList.add('icon');
    backBtn.classList.add('i-left');
    backBtn.addEventListener('click', () => {
        backBtn.remove()
        undeploySearch()
    })
    navSearchInput.insertAdjacentElement('beforebegin', backBtn)
    navSearchInput.focus();
    navSearchBtn.addEventListener('click', search)
}

function undeploySearch () {
    searchDeployed = false
    
    navSearch.classList.remove('nav-search-deployed')

    //navSearch.style.cssText = ""
    //navSearchInput.style.cssText = ""
}

function main() {
    navSearch = document.querySelector('.nav-search')
    navSearchInput = document.querySelector('#nav-search-input')
    navSearchBtn = document.querySelector('#nav-search-button')
    navSearchBtn.addEventListener('click', search)
    window.onresize = () => { if (searchDeployed && window.innerWidth > 480) { undeploySearch() } }
    
}

window.onload = main