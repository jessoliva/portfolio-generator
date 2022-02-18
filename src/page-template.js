// receives inputs and adds them to the html template literal to create it
const generatePage = (name, github) => {
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
     <h1>${name}</h1>
     <h2><a href="https://github.com/${github}">Github</a></h2>
   </body>
   </html>
   `;
};

// needed in src file that has the function we want to make available to other files
// exporting generatePage function
module.exports = generatePage;