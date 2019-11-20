'use strict';

const STORE = (function(){
  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(item) {
    this.list.push(item);
  };
 
  const findAndDelete = function(id) {
    this.list = this.list.filter(item => item.id !== id);
  };
  
  return {
    list: [],
    error: '',
    filtered: 'ALL',

    addBookmark,
    findAndDelete,
    setError, 
  };
  
}());