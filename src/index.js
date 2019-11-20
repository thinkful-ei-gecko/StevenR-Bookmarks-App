'use strict'

$(document).ready(function() {
    Bookmarks.bindEventListeners();
    api.getBookmarks()
      .then((BmItems) => {
        BmItems.forEach((item) => STORE.addBookmark(item));
        Bookmarks.renderList();
      });
  });