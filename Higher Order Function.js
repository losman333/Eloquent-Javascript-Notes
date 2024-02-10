/** large program is costly
 * size involves complexity
 * introduces bugs(mistakes)
*/
// Abstraction //
/**
 * what do abstractions do?
 * 
 * hide details and give us the ability to talk about problems at a higher level(abstract
 * 
 * useful to notice when you are working a low level on abstraction
 */


//Abstraction Repetition//
/**
 * common for program to use a loop
 */

<<<<<<< HEAD


//Higher Order Functions //
=======
for (let i = 0; i < 10; i++) {
    console.log(i)
}
>>>>>>> 6b34f1eafb4fb8a26513c6ff88b23a73da5a6cb7

/**
 * abtract "Doing something N times as a function"
 * a function that calls console.log N times
 */

function repeatLog(n){
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}

/**
 * to do something other than logging numbers
 * doing something represented as a function
 * functions are just values
 * pass action as a function value
 */
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);

/**
 * pg 130
 * Don't pass a predifined function to repeat
 * create a function value on the spot instead  
 */

let labels = [];
/** written like a for loop */
repeat(5, i => {
    /* body written as a function value
    wrapped in the parentheses of the call to repeat
    has to be closed with the closing brace and closing
    parenthesis
    */
    labels.push('Unit ${i + 1}');
    //where body is a single small expression you could also omit the 
    //braces and write loop on a single line
});
console.log(labels);

Higher Order Functions

/** 
 * what is a high order function?
 * 
 * functions that operate on other functions
 * by taking as arguements or returning them
 * 
 * reason for using them?
 * allows you to abstract over actions not just values.
 * come in several forms.
 * 
 * you can have funtions that create functions
 */
function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

/** functions that change other functions
 * 
 */

function noisy(f) {
    return (..args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3, 2, 1);

/**
 * functions that provide new types of control flow
 */

function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});

/**
 * A built-in array method, forEach 
 * provides li a for loop as a higher-order func
 */

["A", "B"].forEach(1 => console.log)

//Script dataset//
/** Where are higher-order functions good to use
 * 
 * Data processing
 * 
 * This chapter will use a data set about scripts Lating
 * cyrillic, or Arabic
 * 
 * Unicode assigns number to each character in written language
 * most characters are associated with a specific script
 * standard contains 140 different scripts-81 still used 59 historic
 * 
 *the bindings contain an array of objects which describes a script
 */

//Filtering Arrays//

/**
 * to find script in data set that are still in use
 */


//transforming with map//

/**
 * map method transforms an array by applying a function to all
 * its elements and building a new array from returned values.
 * new array will have same length as input array
 * content will have been mapped to a new form by the function
 */

function map(array, transform) {
    let mapped = [];

    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}
let rtlScripts =  SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// summarizing with reduce //
/**
 * compute a single value from array
 * 
 * summing a collection of numbers is an instance of this
 * ex finding a script with the most characters
 * 
 * what is reduce?
 * 
 * a higher order operation that represents a pattern
 * 
 * returns a single value element after traversing an array
 * 
 * builds a value by repeatedly taking a single element from 
 * the array and combining it with the current value
 * 
 * parameters array, combining function and a start value
 */

function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
        current = combine(current, element);
    }
    return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));  

console.log([1, 2, 3, 4].reduce((a, b) => a + b));

// to reduce twice to find script with most characters//

function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);

    }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));

// Composability //

/**
 * how to find the biggest script without higher-order functions
 * 
 */

let biggest = null;
for (let scripts of SCRIPTS) {
    if (biggest == null || 
        characterCount(biggest) < characterCount(script)) {
            biggest = script;
        }
}
console.log(biggest);

/**
 * write code that finds the average of origin for living and dead scripts
 * in the data set
 */
function average(array) {
    return array.reduce((a,b) => a + b) / array.length;
}

console.log(Math.round(average)(
    SCRIPTS.filter(s => !s.living).map(s => s.year)));

console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));

/** start with all scripts, filter out the living or dead ones, take the 
 * years from those, average them
 * round the results
 * 
 * you could write computation as one big loop
 */

let total = 0, count = 0;
for (let scripts of Scripts) {
    if (script.living) {
        total += script.year;
        count += 1;
    }
}
console.log(Math.round(total / count));

// //

//compose operations /

// Strings and character codes //

/**
 * a use of the data set is figuring out what script a piece of text is using
 * each script has an array of character code ranges
 * associated with it
 * 
 * given a character code we could use a 
 * fuction to find corresponding script
 */

function characterScript(code) {
    for(let script of SCRIPTS) {
        /**
         * some method is another higher-order function
         * takes a test function 
         * tells whether that function returns for any
         * of the elements in the arrays
         */
        if( scripts.ranges.some(([from, to]) => {

        })) {
            return script;
        }
    }
    return null;
}

console.log(characterScript(121));

// how to get character codes in a string//

/**
 * strings are encoded as a sequence of 16-bit 
 * numbers called code units
 * 
 * Unicode character wsa initially supposed to fit within 
 * such a unit which gives 65,000 characters
 * neet to use more memory per character
 * 
 * UTF-16 the format used by JS was invented
 * describes most common characters using a single 16-bit 
 * code unit but uses a pair of two such units for others
 * 
 * What will happen if your language doesn't use two-unit characters
 * 
 * if a program is written with less common chinese characters will break
 * 
 * what are the drawbacks of using utf-16 
 * getting string length and accessing their content
 * using square brackets, deal only with code units 
 */
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟"; console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character) 
console.log(horseShoe.charCodeAt(0)); 
// → 55357 (Code of the half-character) 
console.log(horseShoe.codePointAt(0));
/** codePointAt method = give a full Unicode character 
 * to run over all characters in a string
 * need to deal with the question of whether a character takes 
 * one or two code units
 * */ 


// what is charCodeAt method??
//gives a code unit, not full character code




// Recognizing test //

// Summary //

// Being able to pass function values to other function values is a very usefull features//
/* 
Being able to pass functions values to other function is a usefull aspect of Javascript

Array provide useful highe-methods methods 

filter method?

combine all elements of an array?

How to transform arrays?

sume method tests an element?

find index finds?


*/

// Excercises //
// flattening //
/* use reduce with concat to flatten an array into single array that has all the elements of the original arrays */




/* flatten
use reduce method in combination with concact method to flatten an
array of arrays into a single array that has all the elements
of the orginal arrays
*/


/*Your own loop
write a high-order function loop that provides a for loop statement. 
Takes a 
value a 
test function 
update function
a body function

Each iteration first runs the test function on current loop stops 
if returns false
calls the body function giving it the current value
finally calls the update function to create a new value and starts from the begining
Use a regular loop to do the actual looping when defining the function

*/


/** Everything 
 * every mehod is opposite some method
 * returns truewhen the given function returens 
 * true for every element in the array. 
 * some method a version of the || operator that acts on arrays
 * every is like the && operator on arrays 
 *
 * Implement every as a function that takes an array and a predicate
 * function as parameters
 * 
 * write two version one using a loop and one using the some method
*/

/* dominant writing direction 
write a function that computes the dominant writing direction in a string of text
use characterScript
and countBy functions
*/

