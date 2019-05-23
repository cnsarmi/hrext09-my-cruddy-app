/*
 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)
*/

//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
}


//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
}

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
}

//Creates item
var addToList = function(key, value) {
  return window.localStorage.setItem(key, value);
}

//Updates item
var updateList = function(key, value) {
  deleteItem(String(key))
  return window.localStorage.setItem(value, value);
}

var markCompleted = function(value) {
  alert("You completed: " + value + "!")
  updateList(value, (value + " COMPLETED"))
}

var showList = function() {
  var list = document.querySelector('ul');
  list.innerHTML = null;
  for (var i = 0; i < window.localStorage.length; i++) {
    var element = localStorage.key(i)
    var itemList = document.createElement('li');
    var item = localStorage.getItem(element);


    itemList.textContent = item;
    list.appendChild(itemList);
  }
}

clearEverything()

// ///////////////////////////////////////////
// event handlers for the buttons and ... possibly the inputboxes
//   preventdefault on button clicks
$(document).ready(function() {

  $("#createButton").click(function(event) {
    event.preventDefault();
    var currentValue = $("#add").val();
    
    if (keyExists(currentValue)) {
      //current key exists, do something error-handle-y
      alert("Item already on bucket list")
    } else {
      addToList(currentValue, currentValue);
    }
    showList();

});

  $("#updateButton").click(function(event) {
    event.preventDefault();

    var oldItem = $("#updateItem").val();
    var newItem = $("#updateList").val();

    if (newItem === '') {
      alert("Please enter the new item");
    } else if (keyExists(oldItem)){
      updateList(oldItem, newItem);
    } else {
      //current key doesnt exist, do stuff
      alert("This item doesn\'t exist!")
    }

    showList()

  });

  $("#compeltedButton").click(function(event) {
    event.preventDefault();

    var completedItem = $("#completedItem").val();

    if (!keyExists(completedItem)) {
      alert("This item doesn\'t exist!")
    } else {
      markCompleted(completedItem)
    }
    showList()
    console.log(localStorage)
  });

  $("#deleteButton").click(function(event) {
    event.preventDefault();

    var deletedItem = $("#delete").val();

    if (!keyExists(deletedItem)) {
      alert("this item doesn\'t exist!")
    } else {
      deleteItem(deletedItem)
    }
    showList();
  });

  

});