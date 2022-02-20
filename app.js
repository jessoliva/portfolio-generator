// // purpose of app.js file is to execute functions to capture user input and create a file

// tell node to use the inquirer module that was downloaded
const inquirer = require('inquirer');
 
// // tells node to use the File System module
// const fs = require('fs');

// // for destination file that we want to receive the exported functions from src file from
// // receiving generatePage() function from page-template.js file --> need relative path
// // the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
// // the relative path to include the file must be exact.
// const generatePage = require('./src/page-template')

// // get the code from page-template.js
// const pageHTML = generatePage(name1, github);

// // create a file
// // writes the code from the previous function into the html file
// fs.writeFile('./index.html', pageHTML, err => {
//    // handles errors
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));