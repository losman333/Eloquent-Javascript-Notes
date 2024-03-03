// Regular Expressions 

/**
 * what are regular expressions
 * 
 * how are they used
 * 
 * what are the benefits
 */


// Creating a regular expressions

/**
 * 
 * context
 * 
 * a type of object
 * 
 * it can be constructed with RegExp constructor or written
 * as a literal value by enclosing a pattern in forward slash / character
 */
let re1 = new RegExp("abc");
let re2 = /abc/;

/**
 * forward slash ends the pattern
 * put a backslash before any forward slash that we want to be part
 * of the pattern
 * backslashes  that arent part of special character codes like \n
 * questions marks and plus signs have special meaning 
 * must be preceded by a backslash if they are meant to represent the character
 */

let eighteenPlus = /eighteen\+/;
// testing for matches

// context
/**
 * test method used to tell whether a string contains
 * a match of the pattern in the expression
 */


// sets of characters

/**
 * what do reg ex allows to do
 * 
 * how do you indicate a range of characters
 * 
 * how is ordering determined */


// common character groups with built in shortcuts //
/**
 * Any digit character
 * alphanumeric character
 * whitespace character
 * character not a digit
 * nonalphanumeric character
 * noewhitespace character
 */


/*
 * 
 * where else can back slashes be used in
 * 
 * what does it mean to invert a set of characters 
 * how do you write it
 */

// repeating parts of a pattern

/**
 * 
 * Context
 * 
 * 
 * How do you match a sequence of one or more digits
 * 
 * What is the + sign for in reg ex
 * 
 * what is * used for in reg exp
 * 
 * what is ? used for in reg exp
 * 
 * how do you indicate a pattern should occur 
 * precise number of times?
 * 
 * how can you specify open ended ranges
 */

// grouping subexpressions

/**
 * 
 * context
 * 
 * how do you use an operator on more than one
 * element at a time
 * 
 * how does a reg ex count as one group
 * 
 * what does the i represent at the end of an 
 * expression do ?
 * 
 */

// matches and groups

/**
 *  what is the test method used for
 * 
 * what does the exec method do
 * 
 * what does an object returend from exec have
 * 
 * what does an object appear to be
 * 
 * what is the match method used for
 * 
 * what happens when a group does not end up being matched 
 * 
 * what happens if a group is matched multiple times
 * 
 * how do you extract a date and construct an object 
 * represents it
 */

// the date class

/**
 * what is the convention for date class
 * 
 * what are the last four arguments class for
 * 
 * how are timestamps stored where does the convention come from
 * 
 * what can you use for times before 1970
 * 
 * what does the get method do
 * 
 * what happens if you give a date constructor a single argument
 * 
 * how can you get the current millisecond count
 * 
 * what kind of methods do date objects provide
 * 
 * how do you create a date object from a string
 */

// word and string boundries

/**
 * 
 * how to enforce a match across the whole string
 * using caret and $
 * 
 * what is a word boundry?
 * 
 * does a boundry marker match an actual character?
 */

// choice patters

/**
 * how can you tell whether a piece of text contains 
 * a number followd by a word and a pluarl form
 */
// the mechanics of matching

/**
 * what happens when you use exec or test
 * 
 * 
 * how does reg ex engine treat a regular expressions
 */

// Backtracking
/**
 * what is backtracking
 * 
 * where else does backtracking happen
 * 
 * when is possible to write reg ex's that will do a 
 * lot of backtracking
 */

// the replace method

/**
 * what is replace method used for
 * 
 * what is the benefit of using replace with reg ex
 * 
 * how is it possible to pass a function instead of 
 * string as the second argument to replace
 */
// greed

/** how to write a function that removes all comments
 * from a piece of JavaScript code
 * 
 * what does it mean when repetition operators 
 * are greedy
 * 
 * how to make something not greedy
 * 
 * what can bugs in regular expressions be traced to
 */

// dynamically creating RegExp objects

// context 
/**
 * 
 * you might not know the pattern you
 * need to match agains when you 
 * are writing your code
 * 
 * find user name in a piece of text and 
 * enclose it in uderscore characters to
 * make it stand out you only know the name
 * only once the program is actually
 * running you cant use slash-based notation
 * 
 * you can build up a string and use the RegExp 
 * constructor on that
 */

let name = "harry";
let text = "Harry is a suspicious character.";
// use two backslashes \b boundry markers because we are writing them 
// in a normal string
let regexp = new RegExp("\\b(" + name +")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// _Harry_ is a suspicious character

/**
 * 
 * second argumeent to RegExp constructor contains
 * options for the regular expression
 * 
 * use backslash before any character that has special meaning \
 */

let name = "dea+h1[]rd";
let text = "This dea+h[]rd guy is super annoying.";
let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");

console.log(text.replace(regexp, "_$&_"));

// what is the purpose of creating regexp objects



//what is the benefit

// the search method

/**
 * context 
 * 
 * indexOf method on strings cannot be called
 * with regular expressions
 * 
 * search method returns first index on which expressions 
 * was found or -1 when it wasn't found
 */

// the lastIndex property

// Parsing an INI file

// International characters

// Summary

// Excercises


