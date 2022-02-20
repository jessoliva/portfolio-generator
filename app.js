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

// the function returns a running of inquire.prompt(), thus returning what it returns, which is a Promise
// the Promise will resolve with a .then() method
// arrow function w no arguments
const promptUser = () => {

   // returns a running of inquire.prompt(), thus returning what it returns, which is a Promise
   return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => { // receives users input as argument and validates it
            if (nameInput) {
               return true;
            } else {
               console.log('Please enter your name!');
               return false;
            }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
            if (githubInput) {
               return true;
            } else {
               console.log('Please enter your GitHub Username!');
               return false;
            }
         }
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
   ]);
};

// asks project questions
const promptProject = portfolioData => {

   // empty local array to hold several projects
   // added the projects array to the portfolioData object and initialized it as an empty array
   // use if statement so array is not set to empty in every function call, bc doing that would erase all project data we collected
   // If there's no 'projects' array property, create one, if there is one, don't initialize it again
   if (!portfolioData.projects) {
      portfolioData.projects = [];
   }

   // uses template literals
   console.log(`
 =================
 Add a New Project
 =================
 `);
   
   return inquirer.prompt([
     {
       type: 'input',
       name: 'name',
       message: 'What is the name of your project? (Required)',
       validate: projectInput => {
         if (projectInput) {
            return true;
         } else {
            console.log('Please enter the name of your project!');
            return false;
         }
      }
     },
     {
       type: 'input',
       name: 'description',
       message: 'Provide a description of the project (Required)'
     },
     {
       type: 'checkbox', // has the choices property
       name: 'languages',
       message: 'What did you build this project with? (Check all that apply)',
       choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'] // list of possible answers
     },
     {
       type: 'input',
       name: 'link',
       message: 'Enter the GitHub link to your project. (Required)',
       validate: linkInput => {
         if (linkInput) {
            return true;
         } else {
            console.log('Please enter the link to your project!');
            return false;
         }
      }
     },
     {
       type: 'confirm', // is a Boolean question that cna receive yes or no (true or false) answers
       name: 'feature',
       message: 'Would you like to feature this project?',
       default: false // default: no
     },
     {
       type: 'confirm',
       name: 'confirmAddProject',
       message: 'Would you like to enter another project?',
       default: false
     }
   ]) // collect data and returns it as Promise --> projectData (Promise that will be resolved by .then())
   .then(projectData => { // once data has been collected, do this with it
      // use the array method push() to place the projectData from inquirer into the new projects array we just created
      portfolioData.projects.push(projectData); 

      // if confirmAddProject is true, then call the promptProject(portfolioData) function
      if (projectData.confirmAddProject) {

         return promptProject(portfolioData); 
         // need portfolioData in the arg bc if not included, a new projects array will be initialized, & the existing project data will be lost
         // so if yes, fun the function but also send the portfolioData for the current project into the function to save it

      } else {
         return portfolioData;
         // return the portfolioData for the curr project in the else statement explicitly so that the object is returned
      }
   });

};

// by chaining the function call to the then() method, we can control the sequence of the application's control flow
promptUser()
   .then(promptProject) // collect data and save as portfolioData
   .then(portfolioData => {
      console.log(portfolioData);
   });


// the Promise from inquirer can now be handled by the function call
// we're calling a function that returns the result of inquire.prompt, which is a Promise
// We therefore append the .then() method to the function call, since it returns a Promise, and we put into .then() whatever we wish to take place after the Promise is resolved
// there's a function in the .then() method --> arrow function w 1 argument 
// promptUser().then(answers => console.log(answers));