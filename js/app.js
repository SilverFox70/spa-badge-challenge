
$(function () {
  console.log("JS is active");

  // Grab the template script
  var theTemplateScript = $("#example-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // This is the default context, which is passed to the template
  var context = {
    people: [
      {uid:'1',path: '/people/1/badges', firstName: 'Homer', lastName: 'Simpson' },
      {uid:'2',path: '/people/2/badges', firstName: 'Peter', lastName: 'Griffin' },
      {uid:'3',path: '/people/3/badges', firstName: 'Eric', lastName: 'Cartman' },
      {uid:'4',path: '/people/4/badges', firstName: 'Kenny', lastName: 'McCormick' },
      {uid:'5',path: '/people/5/badges', firstName: 'Bart', lastName: 'Simpson' }
    ]
  } // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $("#people_list").append(theCompiledHtml);
});
