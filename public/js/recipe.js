$(function(){


var edamamCall;
var preference;
$.get('/api/user_data', function(data){
  edamam(data.preference);
})


//Obtain user inputs
// $('#submitInfo').on('click', function(event) { 
// event.preventDefault();

function edamam(pref){
// var e = document.getElementById('userPreference');
var value = pref;
var diet;

if (value == 1) {
  diet = "vegan"
  console.log(diet)
  }
else if (value == 2) {
  diet = "vegetarian"
  }
else if (value == 3) {
  diet = "paleo"
  }
else if (value == 4) {
  diet = "pescatarian"
  }
else if (value == 5) {
  diet = "balanced"
  }

    
var queryURL = `https://api.edamam.com/search?q=${diet}&app_id=b4544b0b&app_key=549eddf763b78d2ec7e3fc9db4d1ef5d`
$.get(queryURL, function(response){

  edamamCall = response.hits;
  // for (var i = 0; i < edamamCall.length; i++) {
  for (var i = 0; i < 5; i++) {

      var recipeDiv = $('<div>');
      recipeDiv.attr('id', 'receipeInfo' + i);
      recipeDiv.attr('class', 'card rounded');
      recipeDiv.attr('style', 'width: 33rem;');
      recipeDiv.css({'height': '340px', 'margin' : '10px'});

      var recipeAnchor = $('<a>')
      // recipeAnchor.attr('href', edamamCall[i].recipe.url);
      // recipeAnchor.attr('target', '_blank');

      var recipePic = $('<img>');
      recipePic.attr('class', 'card-img-top rounded')
      recipePic.attr('src', edamamCall[i].recipe.image);
      recipePic.attr('alt', 'pic of food');
      recipeAnchor.append(recipePic);

      var recipeTitle = $('<h3>');
      recipeTitle.attr('class', 'card-text text-center text-wrap card-title recipeTitle');
      recipeTitle.text(edamamCall[i].recipe.label);
      recipeAnchor.append(recipeTitle);

      var recipeSource = $('<h4>');
      recipeSource.attr('class', 'card-text text-center text-wrap');
      recipeSource.text('Source: ' + edamamCall[i].recipe.source);
      recipeAnchor.append(recipeSource);

      var recipeUrl = $('<button>');
      recipeUrl.attr('class', 'card-text text-center text-wrap btn btn-info');
      recipeUrl.attr('href', edamamCall[i].recipe.url);
      recipeUrl.attr('target', '_blank');
      recipeUrl.text('Get Details');
      recipeAnchor.append(recipeUrl);

     //Append name,image and url of the recipe
      recipeDiv.append(recipeAnchor);

      //Recipes ingredients
      var ingredientsDiv = $('<div>'); //whole grocery card
      var ingredientItems = $("<div>");
      ingredientItems.attr('class', 'ingredient')
      // ingredientItems.text(edamamCall[i].recipe.ingredientLines);
      // var groceryItem = $("<h6>");

      for (var j = 0; j < edamamCall[i].recipe.ingredientLines.length; j++) {
        var groceryItem = $("<p>");
        groceryItem.text(edamamCall[i].recipe.ingredientLines[j]);
        ingredientItems.append(groceryItem);
        console.log(groceryItem);
      }

      var recipeName = $('<h2>');
      recipeName.attr('class', 'recipeName');
      recipeName.text(edamamCall[i].recipe.label);
      $(recipeName).append(ingredientItems);
      $(ingredientsDiv).append(recipeName);
      recipeName.attr('class', 'recipeGroceries')

      //send response to our html page 
      $('#recipes').append(recipeDiv);
      $('.meal').append(ingredientsDiv)
     } 
   })
  // })
  };
});

$.get("/api/user_data", function(response){
  console.log(response.name)
  $("#name").html(response.name.toUpperCase())
})