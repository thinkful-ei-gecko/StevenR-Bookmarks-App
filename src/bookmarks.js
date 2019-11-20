'use strict';


const Bookmarks = (function() {

  function generateError(error) {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${error}</p>
      </section>
    `;
  }

  const generateBookmarkElement = function(item) {
    return `
      <li class="js-bookmark-item bookmark-item" data-bookmark-id="${item.id}">
        <div class="title"><h3>${item.title}</h3>
          <a href="${item.url}" target="_blank" class="js-visit"><button class="visit-url">Visit Site</button></a>
          <button class="delete-button">Delete</button>
        </div>
        <div class="rating"><h3>Rating:</h3> ${item.rating} Stars</div>
        <div class="description"><h3>Description:</h3>${item.desc}</div>
      </li>
    `;
  }

  const generateBookmarkList = function(Bookmarks) {
    const Bmitems = Bookmarks.map((item) => generateBookmarkElement(item));
    return Bmitems.join('');
  }

  function renderError() {
    if (STORE.error) {
      const el = generateError(STORE.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }

  function renderList() {
    let BmItems = [...STORE.list];
    if (STORE.filtered !== 'ALL'){
      Bmitems = Bmitems.filter(item => item.rating >= STORE.filtered);
    }
    const bookmarkListItemsString = generateBookmarkList(BmItems);
    $('.js-Bookmarks-List').html(bookmarkListItemsString);
  }

  
  function renderForm() {
    $('#add-bookmark').hide();
    $('#mainpage-filter').hide();
    
    $('.main-container').prepend(`
    <form class="create-bookmark-form" id="js-form">
      <label for="title"><h3>Enter Bookmark Name:</h3></label>
      <br>
      <input type="text" id="title" placeholder="Name..." name="title" required>
      <br>
      <label for="url"><h3>Website URL:</h3></label>
      <br>
      <input type="text" id="url" placeholder="https://" name="url" required>
      <br>
      <fieldset class="multi-choice">
      <h3>Rating:</h3>
        <label for="rating1"><label>
        <input type="radio" id="rating1" name="rating" value="1">1 Star</input>
        <label for="rating2"><label>
        <input type="radio" id="rating2" name="rating" value="2">2 Stars</input>
        <label for="rating3"><label>
        <input type="radio" id="rating3" name="rating" value="3">3 Stars</input>
        <label for="rating4"><label>
        <input type="radio" id="rating4" name="rating" value="4">4 Stars</input>
        <label for="rating5"><label>
        <input type="radio" id="rating5" name="rating" value="5">5 Stars</input>
      </fieldset>
      <br>
      <label for="description"><h3>Description</h3></label>
      <br>
      <textarea id="description" name="desc" form="js-form" placeholder="Description..."></textarea>
      <br>
      <input class="submit" type="submit" value="Submit">
    </form>
  `);
  }

  function removeBookmarkForm() {
    $('#add-bookmark').show();
    $('#mainpage-filter').show();
    $('#js-form').remove();
  }

  function handleAddNewBookmark() {
    $('#add-bookmark').on('click', function(){
      renderForm();
    });
  }


  function bindFormSubmit() {
    $('body').on('submit', '#js-form', function(event){
      event.preventDefault();
      const formData = new FormData(this);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      api.createBookmark(JSON.stringify(o)).then((result) => {
        STORE.addBookmark(result);
        renderList();
        removeBookmarkForm();
      })
        .catch((error) => {
          STORE.setError(error)});
          renderError();
        });
    };

  

  const getBookmarkIdFromElement = function(BmItem) {
    return $(BmItem)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
  }

  function handleDelete() {
    $('.js-Bookmarks-List').on('click', '.delete-button', function(e) {
      const id = getBookmarkIdFromElement(e.currentTarget);
      api.deleteBookmark(id).then(() => {
        STORE.findAndDelete(id);
        renderList();
      }) 
        .catch((err) => {
      
          STORE.setError(error);
          renderError();
        });
    });
  }

  function handleFilter() {
    $('#filter-item').on('change', function(e) {
      let filterBy = $(e.currentTarget).val();
      console.log(filterBy);
      STORE.filtered=filterBy;
      renderList();
    });
  }

  function handleExpandedView() {
    $('.js-Bookmarks-List').on('click', '.expand', function(e){
      $(e.currentTarget).closest('li').find('p').toggleClass('hidden');
    });
  }

  function handleError() {
    $('.error-container').on('click', '#cancel-error', () => {
      STORE.setError(null);
      renderError();
    });
  }

  function bindEventListeners() {
    handleAddNewBookmark();
    bindFormSubmit();
    handleDelete();
    handleFilter();
    handleExpandedView();
    handleError();
  }

  
  
  return {
    renderList,
    bindEventListeners,
  };
  
  }())



