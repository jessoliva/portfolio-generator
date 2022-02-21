// 9.4 BEFORE REFACTOR 
// this function will accept the about variable as a parameter, and if it doesn't exist, we'll simply return an empty string 
// if it does exist, we'll return the entire <section> element
// create the about section
const generateAbout = aboutText => {

  // if there is NO content in the about property from templateData, return empty string
  if (!aboutText) {
    return '';
  }

  // else, return the <section> element
  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
  `;
};

// generates project section
const generateProjects = projectsArr => {

  // get array of just featured projects
  const featuredProjects = projectsArr.filter(project => {
    // if project.feature is true! then add that project to the featuredProjects array
    if (project.feature) {
      return true;
    } else {
      return false;
    }
  });

  // get array of all non-featured projects
  const nonFeaturedProjects = projectsArr.filter(project => {
    if (!project.feature) {
      return true;
    } else {
      return false;
    }
  });

  // map through each array element (each project) in the featuredProjects array --> use .map() to iterate through each project
  // First, we take the array of project data and we create a new array from it, called projectHtmlArr
  // we destructure each project's object data based on property name, and we return an entire set of HTML code with it!
  const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
    return `
      <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
        <h3 class="portfolio-item-title text-light">${name}</h3>
        <h5 class="portfolio-languages">
          Built With:
          ${languages.join(', ')}
        </h5>
        <p>${description}</p>
        <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
      </div>
    `;
  });

  const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(
    ({ name, description, languages, link }) => {
      return `
        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
          <h3 class="portfolio-item-title text-light">${name}</h3>
          <h5 class="portfolio-languages">
            Built With:
            ${languages.join(', ')}
          </h5>
          <p>${description}</p>
          <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
        </div>
      `;
    }
  );
  

  // Then we take that arrays and interpolate them into the returning project <section> element template literal
  // We use a .join() method to turn the project arrays+html into a combined string of HTML before returning
  // everything from the top for each project, is added in here!
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
        ${featuredProjectHtmlArr.join('')}
        ${nonFeaturedProjectHtmlArr.join('')}
      </div>
    </section>
  `;

  // Using the .filter() array method, we created two new arrays of project data based on whether their feature property was true or false
  // Once we separated the array data, we created two sets of HTML data and got them into the <section> element

  // what the function does
  // we're checking to see if the project's feature property is true or false
  // We then take the arrays and use .map() to create the HTML content for them,
  // and we finally write it to the page in the returning <section> element
};

// needed in src file that has the function we want to make available to other files
// exporting that function
// receives inputs and adds them to the html template literal to create it
// parameter has been renamed templateData to reflect that it now accepts the promise object returned by inquirer
module.exports = templateData => {

  // the template data is all the info you input in the inquirer prompts
  console.log(templateData);

  // destructure projects and about data from templateData based on their property key names
  // this will create three variables based on data in templateData
  // we're taking the rest of the data that hasn't been destructured from templateData and storing it in a new object, called header
  // destructure page data by section
  // header holds name and github info
  const { projects, about, ...header } = templateData;

  // function definition has been changed to use the promise object's properties
  // call the generateAbout() function in here!! 
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
      ${generateAbout(about)}
      ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
  // we generate the current year in the <footer>
  // People often simply forget that the year has changed since the first time they set up their site, so the code we use there will get the current year and put it in the <footer> element every time we run the app
  // This is another benefit of using string interpolation in JavaScript: we can execute valid JavaScript code inline with the text
};




// START OF 9.3.5
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

/////////////////////////////////////////////////////////////////////////////

// this is cutting out the first two indexes of the array, from the command line, which are --> node app.js 
// and saving the rest of the indexes from the command line
// leaves out indexes 0, 1 and the number that = process.argv.length - gets everything in between
const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

// Notice the lack of ( ) around the `profileDataArr` parameter? Don't need bc only 1 parameter is being passed
// print out the items in the array one by one
const printProfileData = profileDataArr => {
  // This...
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }

  console.log('================');

  // Is the same as this...
  profileDataArr.forEach((profileItem) => {
    console.log(profileItem)
  });

  console.log('================');

  // Is the same as this... 
  // Using an arrow function, we can avoid using the function keyword, parentheses around the function parameter, and the curly braces used to wrap a function, as we're only performing one action in the function.
  profileDataArr.forEach(profileItem => console.log(profileItem));
};
printProfileData(profileDataArgs);

// 9.2.4 older one
// This function returns a string
// () are unnecessary in arrow functions when there is 1 parameter
// but () are necessary when there are no parameters or more than 1 parameters
// return keyword is absent --> function has only 1 statement so don't need {} and return is implied
const generatePage = () => 'Name: Jess, Github: Yes';

// using template literals ` ` to interpolate variables in the string
// this is the same..
const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

// as this..
const generatePage = (userName, githubName) => {
  return `
    Name: ${userName}
    GitHub: ${githubName}
  `;
};

// 9.2.4
// this is cutting out the first two indexes of the array, from the command line, which are --> node app.js 
// and saving the rest of the indexes from the command line
// leaves out indexes 0, 1 and the number that = process.argv.length - gets everything in between
// holds the users command line arguments
const profileDataArgs = process.argv.slice(2, process.argv.length);
// save the indexes from the array formed by the command line arguments
const name1 = profileDataArgs[0];
const github = profileDataArgs[1];

console.log(profileDataArgs);

// This function receives input and returns a string with variables interpolated in it
const generatePage = (userName, githubName) => {
   // ` ` allow multiline text
   return `
   Name: ${userName}
   GitHub: ${githubName}
   `;
   // returns info on 2 lines
   // Name: info
   // GitHub: info
};
console.log(generatePage(name1, github));

// 9.2.4 cleaned up
// holds the users command line arguments, starting at input 2 (not 0 nor 1)
const profileDataArgs = process.argv.slice(2, process.argv.length);
// save the indexes from the array formed by the command line arguments
const [name1, github] = profileDataArgs;

// This function receives input and returns a string with variables interpolated in it
// to receive name1 and github inputs
const generatePage = (userName, githubName) => {
   // ` ` allow multiline text
   return `
   Name: ${userName}
   GitHub: ${githubName}
   `;
};

console.log(name1, github);
console.log(generatePage(name1, github));

// 9.2.5 V1
// 1st parameter --> the name of the file that's being created (output file)
// 2nd parameter --> the data that will write onto the file --> in this case HTML template literal
// 3rd parameter --> a callback function that will be used for error handling and a success message
// the err doesn't need () bc it's only one parameter, but, when there are no arguments or more than one, () are necessary
fs.writeFile('index.html', generatePage(name1, github), (err) => {
   // handles errors
   // conditional statement checks for the err being returned by the callback function. If err exists, an error message is displayed
   if (err) throw err;
   // else success message
   console.log('Portfolio complete! Check out index.html to see the output!');
});

// err w/o () bc it's a callback function w one parameter
fs.writeFile('index.html', generatePage(name1, github), err => {
  // handles errors
  // conditional statement checks for the err being returned by the callback function. If err exists, an error message is displayed
  if (err) throw err;
  // else success message
  console.log('Portfolio complete! Check out index.html to see the output!');
});
