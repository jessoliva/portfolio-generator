// purpose of app.js file is to execute functions to capture user input and create a file

// tells node to use the File System module
const fs = require('fs');

// for destination file that we want to receive the exported functions from src file from
// receiving generatePage() function from page-template.js file --> need relative path
// the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
// the relative path to include the file must be exact.
const generatePage = require('./src/page-template')

// holds the users command line arguments, starting at index 2 (not 0 nor 1) and on
const profileDataArgs = process.argv.slice(2);

// capture user input
// save the indexes from the array formed by the command line arguments
const [name, github] = profileDataArgs;

// create a file
// writes the code from the previous function into the html file
fs.writeFile('./index.html', generatePage(name, github), err => {
   // handles errors
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});