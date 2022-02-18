// holds the users command line arguments, starting at input 2 (not 0 nor 1)
const profileDataArgs = process.argv.slice(2, process.argv.length);
// save the indexes from the array formed by the command line arguments
const [name1, github] = profileDataArgs;

// This function receives input and returns a string with variables interpolated in it
// to receive name1 and github inputs
const generatePage = (userName, githubName) => {
   // receives the command line arguments, inserts them in a HTML template literal, and returns HTML string
   return `
   <!DOCTYPE html> 
   <html lang="en"> 
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Portfolio Demo</title>
   </head>
 
   <body>
     <h1>${name1}</h1>
     <h2><a href="https://github.com/${github}">Github</a></h2>
   </body>
   </html>
   `;
};

// To tell node you want to use the File System module, use the require() method
// takes this core module & saves it to that variable, making it a special JS object that has access to all methods apart of the module
const fs = require('fs');

// 1st parameter --> the name of the file that's being created (output file)
// 2nd parameter --> the data that will write onto the file --> in this case HTML template literal
// 3rd parameter --> a callback function that will be used for error handling and a success message
// the err doesn't need () bc it's only one parameter, but, when there are no arguments or more than one, () are necessary
// removed ( ) from err bc it's a callback function w 1 parameter
// .writeFile is a method
fs.writeFile('index.html', generatePage(name1, github), err => {
   // handles errors
   if (err) throw err;
   
   console.log('Portfolio complete! Check out index.html to see the output!');
});