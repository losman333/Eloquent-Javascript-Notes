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

// choice patters

// the mechanics of matching

// Backtracking

// the replace method

// greed

// dynamically creating RegExp objects

// the search method

// the lastIndex property

// Parsing an INI file

// International characters

// Summary

// Excercises


