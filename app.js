// purpose of app.js file is to execute functions to capture user input and create a file

// tell node to use the inquirer module that was downloaded
const inquirer = require('inquirer');

// to import the exported object from generate-site.js
// allowing us to use generateSite.writeFile() and generateSite.copyFile()
const { writeFile, copyFile } = require('./utils/generate-site.js');

// for destination file that we want to receive the exported functions from src file from
// receiving generatePage() function from page-template.js file --> need relative path
// the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
// the relative path to include the file must be exact
// this expression assigns the anonymous HTML template function in page-template.js to the variable generatePage
const generatePage = require('./src/page-template')

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
         type: 'confirm', // confirm question type automatically turns "Y" into true, and "N" into false
         name: 'confirmAbout',
         message: 'Would you like to enter some information about yourself for an "About" section?',
         default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => { 
          // so only ask this questions WHEN the user confirms the previous question
          // used the when method to conditionally prompt a question based on the user's input
          // when property passes an object of all of the answers given so far as an object
          // inquirer method automatically passes an object containing the user's answers to the when function
          // so passes the name, github name, and answer for confirmAbout
          // user is only prompted for the information regarding the About section if the user answers yes to the request
            if (confirmAbout) {
               return true;
            } else {
               return false;
            }
        }
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

// refactored code using promises
// continue to return the separate functions' output into the next .then() method
promptUser() // ask user questions, and returns output
  .then(promptProject) // asks project questions, and returns output as object
  .then(portfolioData => { // finished portfolio data object is returned as portfolioDate & sent into the generatePage()
      return generatePage(portfolioData); // returns the finished HTML template code into pageHTML
  })
  .then(pageHTML => { // gets the html the from the previous function, and uses it as parameter
      return writeFile(pageHTML); // pass HTML here, which returns a Promise, this is why we use return here, so the Promise is returned into the next .then() method
  })
  .then(writeFileResponse => { // Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it
      console.log(writeFileResponse);
      return copyFile(); // and then we return copyFile(), a Promise is returned by this
  })
  .then(copyFileResponse => { // the Promise returned by copyFile() then lets us know if the CSS file was copied correctly
      console.log(copyFileResponse);
  })
  .catch(err => { // catch all errors, only need one .catch() method to handle any error that may occur with any of the Promise-based functions
      console.log(err);
  });


// // old code using callback funcitons inside of callack functions
// // by chaining the function call to the then() method, we can control the sequence of the application's control flow
// promptUser()
//    .then(promptProject) // collect data and save as portfolioData
//    .then(portfolioData => {

//       // expression that invokes the generatePage() with portfolioData
//       // and uses the result from our inquirer prompts as an argument called portfolioData --> an object
//       // const pageHTML = generatePage(portfolioData);

//       // provides ability to write the HTML template to a file
//       fs.writeFile('./dist/index.html', pageHTML, err => {
//          if (err) throw new Error(err);

//          console.log('Page created! Check out index.html in this directory to see it!');

//          // arg 1 --> copy styles.css file
//          // arg 2 --> coped file's intended destination AND name
//          // arg 3 --> A callback function to execute on either completion or error, which accepts an error object as a parameter so that we can check if something went wrong
//          // find style.css in the src directory and create a copy of it in the dist directory
//          fs.copyFile('./src/style.css', './dist/style.css', err => {

//             // if there's an error, we'll let the user know and stop the .copyFile() method from running with a return statement.
//             if (err) {
//                console.log(err);
//                return;
//             }
//             console.log('Style sheet copied successfully!');
//          });
//       });
//    });
// // the Promise from inquirer can now be handled by the function call
// // we're calling a function that returns the result of inquire.prompt, which is a Promise
// // We therefore append the .then() method to the function call, since it returns a Promise, and we put into .then() whatever we wish to take place after the Promise is resolved
// // there's a function in the .then() method --> arrow function w 1 argument 
// // promptUser().then(answers => console.log(answers));

