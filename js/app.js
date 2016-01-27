
$(function () {
  console.log("JS is active");
  $('.show-user').hide();
  bindListeners();

  // Handlebar code for home/index view of people list
  indexPeopleShow();
});

// Bind all the various listeners for the page
var bindListeners = function(){
  console.log("Listening for events.")
  peopleListListener();
};

// Individual listener functions
var peopleListListener = function(){
  $('.people_list_container').on('click', 'a.person-button', function(e){
    e.preventDefault();
    var this_path = $(this).attr('href');
    console.log("person-button clicked. path : " + this_path);
    showThisPerson(this_path);
  });
};

// Individual AJAX calls
var showThisPerson = function(this_path){
  $.ajax({
    method: 'GET',
    url: this_path,
    dataType: 'json'
  }).done(function(response){
    console.log("ajax response: " + response[0].id + " " + response[0].phrase);
    $('.people_list_container').hide();
    $('.show-user').show();
    showPersonsSlogans(response);
  }).fail(function(response){
    console.log("Ajax fail on showThisPerson.");
  });
};

// Handlebar template views
var indexPeopleShow = function(){
  // Grab the template script
  var theTemplateScript = $("#people-list-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // This is the default context, which is passed to the template
  var context = {
    people: [
      {uid:'1',path: 'http://localhost:4000/people/1/badges', firstName: 'Homer', lastName: 'Simpson' },
      {uid:'2',path: 'http://localhost:4000/people/2/badges', firstName: 'Peter', lastName: 'Griffin' },
      {uid:'3',path: 'http://localhost:4000/people/3/badges', firstName: 'Eric', lastName: 'Cartman' },
      {uid:'4',path: 'http://localhost:4000/people/4/badges', firstName: 'Kenny', lastName: 'McCormick' },
      {uid:'5',path: 'http://localhost:4000/people/5/badges', firstName: 'Bart', lastName: 'Simpson' }
    ]
  } // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $("#people_list").append(theCompiledHtml);
};

var showPersonsSlogans = function(badges){
  // Grab the template script
  var theTemplateScript = $("#badge-list-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);
  badges_array = [];
  for (var i = 0; i < badges.length; i++) {
    badges_array[i] = {id: badges[i].id, phrase: badges[0].phrase, n: i+1}
  };

  // This is the default context, which is passed to the template
  var context = {
    badges: badges_array
  } // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $("h1").append(theCompiledHtml);
};



