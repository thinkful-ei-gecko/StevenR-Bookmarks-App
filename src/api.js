'use strict';



const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/stevenr/Bookmarks';

  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
         
          error = { code: res.status };
        }
  
       
        return res.json();
      })
  
      .then(data => {
   
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
       
        return data;
      });
  }
  
  const getBookmarks = function() {
    return listApiFetch(BASE_URL);
  };

  const createBookmark = function(data) {
    return listApiFetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
  };

  const deleteBookmark = function(id) {
    return listApiFetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  };
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
}());