filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
} 

function filterSelection(category) {
  var certificates = document.getElementsByClassName("filterDiv");
  
  // Hide all certificates
  for (var i = 0; i < certificates.length; i++) {
      certificates[i].classList.remove("show");
  }
  
  // Show selected category if valid
  if (category) {
      for (var i = 0; i < certificates.length; i++) {
          if (certificates[i].classList.contains(category)) {
              certificates[i].classList.add("show");
          }
      }
  }
}

// Initialize first category on page load
document.addEventListener('DOMContentLoaded', function() {
  // Show Certification & Others by default
  filterSelection('');
  
  // Add change event listener to dropdown
  document.getElementById('categorySelect').addEventListener('change', function(e) {
      filterSelection(e.target.value);
  });
});