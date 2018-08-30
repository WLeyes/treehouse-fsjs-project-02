/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

const UICtrl = (() => {
  const UISelectors = {
    studentItem: '.student-item',
    studentName: '.student-details h3',
    page: '.page',
    anchor: '.pagination li a',
    pagination: '.pagination',
    paginationLI: '.pagination ul',
    pageHeader: '.page-header',
    searchInput: '.student-search input',
    searchButton: '.student-search button'
  }
  const UIConfig = {
    recordsPerPage: 10,
    currentPage: 1
  }
  return {
    // used for mapping the selectors
    getSelectors: () => UISelectors,

    // used for getting config values
    getConfig: () => UIConfig,

    showPage: (list, page, recordsPerPage) => {
      for (let i = 0; i < list.length; i++) {
        if (i >= (page * recordsPerPage) - recordsPerPage && i < (page * recordsPerPage)) {
          // if records are within range display
          list[i].style.display = 'block';
        } else {
          // if records fall outside of range hide
          list[i].style.display = 'none';
        }
      }
    },

    appendPageLinks: (list, currentPage, recordsPerPage) => {
      console.log(list);
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();
      // determine how many pages are needed for the list by deviding the total number of list items by the max number of items per page
      let pagesNeeded = Math.ceil(list.length / recordsPerPage);
      console.log(`Pages needed: ${pagesNeeded}`);

      // if pagination already exists, remove it,
      if (document.querySelector(UISelectors.pagination)) {
        document.querySelector(UISelectors.pagination).remove();
      }

      // create a div, give it the "pagination" class, and append to the .page div


      // create outer div 
      const div = document.createElement('div')
      div.className = 'pagination';
      document.querySelector(UISelectors.page).appendChild(div);

      // create ul
      const ul = document.createElement('ul');
      div.appendChild(ul);


      for (let i = 0; i < pagesNeeded; i++) {
        let anchor = `<a href="#">${i + 1}</a>`
        let li = document.createElement('li');
        li.innerHTML = anchor;

        // append each link inside the ul
        ul.appendChild(li);
        document.querySelector(UISelectors.paginationLI)
          .getElementsByTagName('a')[currentPage - 1]
          .classList.add('active');
      }

      // Event listener for when pagination buttons are clicked
      document.querySelector(UISelectors.paginationLI).addEventListener('click', e => {
        e.preventDefault();
        let anchors = document.querySelectorAll(UISelectors.anchor);
        // loop over pagination links to remove active class from all
        for (let i = 0; i < anchors.length; i++) {
          anchors[i].classList.remove('active');
          //  Assign active to button clicked
          e.target.classList.add('active');
        }
        currentPage = e.target.innerHTML;
        UICtrl.showPage(list, currentPage, recordsPerPage);

      });
    },

    search: (searchList, listItem) => {
      // Create search bar
      const searchBar = document.createElement('div');
      searchBar.className = 'student-search';
      searchBar.innerHTML = `
        <input placeholder="Search for students...">
        <button>Search</button>
      `
      document.querySelector(UISelectors.pageHeader).appendChild(searchBar);
      const search = document.querySelector(UISelectors.searchInput);
      const searchButton = document.querySelector(UISelectors.searchInput);
      search.addEventListener('keyup', e => {
        e.preventDefault();
        for (let i = 0; i < searchList.length; i++) {
          if (searchList[i].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
            listItem[i].style.backgroundColor = 'green';
          } else {
            listItem[i].style.backgroundColor = 'red';
          }
        }
      });
    }
  }
})();

const App = ((UICtrl) => {
  return {
    init: () => {
      // Get UI config
      const UIConfig = UICtrl.getConfig();
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();

      // lists
      let list = document.querySelectorAll(UISelectors.studentItem);
      let searchList = document.querySelectorAll(UISelectors.studentName);

      // variables 
      let currentPage = UIConfig.currentPage;
      const recordsPerPage = UIConfig.recordsPerPage;

      // method calls
      UICtrl.showPage(list, currentPage, recordsPerPage);
      UICtrl.appendPageLinks(list, currentPage, recordsPerPage);
      UICtrl.search(searchList, list);
    }
  }
})(UICtrl);

// Ititialize App
App.init();

