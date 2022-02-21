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

