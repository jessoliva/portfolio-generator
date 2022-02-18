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
