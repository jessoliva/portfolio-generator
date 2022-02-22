const fs = require('fs');

// function to write a file
// the HTML file's content is the the parameter
const writeFile = fileContent => {

   // Inside the () for the new Promise, we provide it with a function that accepts two functions as parameters: resolve and reject
   // From there, we can write whatever asynchronous functionality we need to execute, 
   // and run the resolve() function when the code executes successfully or reject() when it fails to execute successfully
   return new Promise((resolve, reject) => {

      // run this function
      // provides ability to write the HTML template to a file
      fs.writeFile('./dist/index.html', fileContent, err => {
         // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
         if (err) {
           reject(err);
           // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
           return;
         }
   
         // if everything went well, resolve the Promise and send the successful data to the `.then()` method
         resolve({
           ok: true,
           message: 'File created!'
         });
      });
   });
};

// function ot copy style.css file
const copyFile = () => {

   return new Promise((resolve, reject) => {

      fs.copyFile('./src/style.css', './dist/style.css', err => {
         if (err) {
            reject(err);
            return;
         }

         resolve({
            ok: true,
            message: 'File copied!'
         });
      });
   });
};

// export from generate-site.js to import into app.js
// exporting an object with the two functions, writeFile() and copyFile(), used as methods, writeFile and copyFile
module.exports = { writeFile, copyFile };
