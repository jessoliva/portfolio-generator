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

// generate project section
const generateProjects = projectsArr => {

  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
        .filter(({ feature }) => feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}
      ${projectsArr
        .filter(({ feature }) => !feature)
        .map(({ name, description, languages, link }) => {
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
        })
        .join('')}
      </div>
    </section>
  `;
  // with .filter() --> a new array is created with all elements that pass the test implemented by the function --> either feature or !feature
  // with .map() --> a new array is formed, each project (array element) from the array will be returned with the html to the new array! --> map builds a new array

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
