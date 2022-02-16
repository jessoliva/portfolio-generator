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


