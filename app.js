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

console.log(name1, github);
console.log(generatePage(name1, github));



