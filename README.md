# DJS03 Project Brief: Book Connect - Abstractions

The "Book Connect" project provides an opportunity to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

# Challenge Overview
#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.


# Project Process
* After getting the starter code from the repository provided by codespace. I started by  getting all the querySelectors for fetching elements from the DOM and assigned them to an object which I then moved to an independent file which I imported to the script file.
* I then identified codes which are repeated throughout the script file, I then put them in functions which are appropiate. I created a createBookElement function which takes an argument which is an object which I destructure within the funciton and create a button element and set attributes and class names and provided inner HTML which takes in value from the variables created inside the HTML being passed as innerHTML, i then return the button element.
* I then have a function used to render the book preview which I use the createBookElement function which is used to append the button element inside the created fragments inside the loop and then the fragment gets appended inside the datalist element.
* I created a function to createOptionElement which creates an option element and sets values and innerText which have assigned to them the parameters of the function.
* The createOptionElmenent function gets used in two function's the setupGenreOption and setupAuthorOption functions which create fragments and append the createOptionElement inside the fragment with the arguments used to set the value and name of the option element. it is also used inside the loop too.
* I then created a function to setThemeProperties and a function to applyPreferredTheme, the setThemeFunction is used inside the applyPreferredTheme function, the setThemeProperties function is used to set the style/theme of the page based on the passed argument.
* I then have another function which is showMoreButton which takes in two parameters which are used to calculate the remaining books inside the button.
* I then have a function which takes in an event as the argument which handles list item on click.
* I then moved my function's to a helper.js file and then exported the functions to the main script file and also had the object from the element.js file to be  imported inside the helper.js file and also imported the data.js file functions.

  
# Challenges
I had a challenge using object's to utilize the data provided, which is why I decided to not use them at all, I only used an object to just assign elements fetched from the DOM and I also struggled in refactoring some of the logic inside the eventlisteners.

# Feedback
This project has been a tough one to wrap my head around. But once I started thing's seemed alot easier to implement and work around. I just struggled with one of the requirements which was the utilization of objects. I wanted to use class but from the video's I saw they were not being used yet, I then saw another way to do it where I would have an object which has all the functions and data used inside it.
