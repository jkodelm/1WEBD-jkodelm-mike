function main() {
    const navSearch = document.querySelector('.nav-search');
    const navSearchInput = document.querySelector('#nav-search-input');
    const navSearchBtn = document.querySelector('#nav-search-button');
    const backBtn = navSearch.querySelector('.back-btn');
  
    let searchDeployed = false;
  
    const deploySearch = () => {
        searchDeployed = true;
        navSearch.classList.add('nav-search-deployed');
        backBtn.classList.remove('hidden');
        navSearchInput.focus();
    };

    const undeploySearch = () => {
        searchDeployed = false;
        navSearch.classList.remove('nav-search-deployed');
        backBtn.classList.add('hidden');
    };

    navSearchBtn.addEventListener('click', () => {
        if (!searchDeployed && window.innerWidth < 480) {
            deploySearch();
        } else {
            console.log('googlisez', navSearchInput.value);
        }
    });

    backBtn.addEventListener('click', undeploySearch);

    window.addEventListener('resize', () => {
        if (searchDeployed && window.innerWidth > 480) {
            undeploySearch();
        }
    });
}

window.onload = main;
