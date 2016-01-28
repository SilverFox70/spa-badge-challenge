// ---------------------------------------------------
// Set a way to get the current person id in a
// 'global' context
// ---------------------------------------------------
var currentPersonId = 0;

function updateCurrentPerson(thisPath) {
  currentPersonId = thisPath.match(/people\/(\d+)/)[1]
}
// ---------------------------------------------------
// Wait for doc ready, then GO!
// ---------------------------------------------------
$(function () {
  console.log("JS is active");
  $('.show-user').hide();
  bindListeners();

  // Handlebar code for home/index view of people list
  indexPeopleShow();
});

// ---------------------------------------------------
// Bind all the various listeners for the page
// ---------------------------------------------------
var bindListeners = function(){
  console.log("Listening for events.")
  peopleListListener();
  voteButtonListener();
};

// ---------------------------------------------------
// Individual listener functions
// ---------------------------------------------------
var peopleListListener = function(){
  $('.people_list_container').on('click', 'a.person-button', function(e){
    e.preventDefault();
    var thisPath = $(this).attr('href');
    updateCurrentPerson(thisPath);
    console.log("New current person id is " + currentPersonId)
    console.log("person-button clicked. path : " + thisPath);
    showThisPerson(thisPath);
  });
};

var voteButtonListener = function(){
  $('.container').on('submit', '.form-class', function(e){
    e.preventDefault();
    console.log("vote-up button clicked, got: badge# " + this.badge_id.value + " vote: " + this.vote_type.value);
    logVote(this);
  });
};

// ---------------------------------------------------
// Individual AJAX calls
// ---------------------------------------------------
var showThisPerson = function(thisPath){
  $.ajax({
    method: 'GET',
    url: thisPath,
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

var logVote = function(theVote){
  path = "http://localhost:4000/people/1/badges/" + theVote.badge_id.value;
  console.log("path in logVote: " + path);
  $.ajax({
    method: 'PUT',
    url: path,
    data: {voteDir: 1},
    dataType: 'json'
  }).done(function(response){
    console.log("ajax response in logVote: " + response);
  });
};

// ------------------------------------------------
// Handlebar template views/handlers are below here
// ------------------------------------------------
// Show the list of all people
// ------------------------------------------------
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

// -------------------------------------------------------
// Show a list of badges for the selected person
// -------------------------------------------------------
var showPersonsSlogans = function(badges){
  // Grab the template script
  var theTemplateScript = $("#badge-list-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);
  badges_array = [];
  for (var i = 0; i < badges.length; i++) {
    badges_array[i] = {id: badges[i].id, phrase: badges[i].phrase, n: i+1, numVotes: badges[i].vote_count};
    console.log("votes: " + badges[i].vote_count);
  };

  // This is the default context, which is passed to the template
  var context = {
    badges: badges_array
  } // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $(".logo").append(theCompiledHtml);
};



