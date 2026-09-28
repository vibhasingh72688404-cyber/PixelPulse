// Select the button by its ID
const button = document.getElementById("clickBtn");

// Add a click event listener
button.addEventListener("click", function() {
  // Action when button is clicked
  document.getElementById("message").textContent = "You clicked the button!";
});
console.log("hello world")