/**
 * computers work with bits
 * 
 * bits are broken up into chunks(values)
 * 
 * every value has to be stored somewhere
 * 
 * values are determined by their type
 * 
 * numbers, text, functions
 * 
 * to create a value inovke the name
 * 
 * values have to be stored somewhere
 * 
 * bits are recycled as soon as a value is no longer needed
 * 
 * js uses 64 bit store a single valuel
 * 
 * number of different numbers can be limited
 * 
 * with N decimal digits you can represent 10N numbers
 * 
 * 64 binary digits can represent 264 different numbers
 * which is about 18 quintillion
 * 
 * computer memoery used to be smaller
 * people used 8 or 16 bits to represent numbers
 * 
 * it was easy to overflow small numbers'
 * 
 * modern devices use 64 bit chunks no need to worry about overflow
 * 
 * not all whole numbers less than 18 quintillion 
 * fit in a javascript numbers
 * 
 * bits can also be negative numbers one bit
 * indicates sign of the number
 * 
 * some bits store position of decimal point
 * 
 * maximum whole numbers that can be stored is
 * in the range of 9 quadrillion
 * 
 * large numbers use exponents
 * 
 * 
 * calculations with whole numbers called integers
 * are allways more precise
 * 
 * 
 * 
 * 
 * 
 */


//Arithmetic
/**
 * operators allow you to take 2 values 
 * to create a new value
 * 
 */

// Strings 
/**
 * used to represent textn written 
 * 
 * how to indicate special meaning 
 *  use backslash \ n after backslash 
 * it is interpreted as a a newline
 * 
 * /t is a tab
 * 
 * strings have to be modeled as a series
 * of bits to be able to exist 
 * inside the computer
 * 
 * JS uses unicode
 * 
 * assigns a number to every character
 * a string can be described by a sequece
 * of numbers
 * 
 * javascript uses 16 bits per string element
 * describes up to 216 different characters
 * 
 * some characters 
 * 
 * can't divide multiply or subtract
 * add can be used to concatenatennn
 * 
 * what is a template literal
 * `half of 100 is ${100 / 2}`
 * 
 * when you add back ticks ``to ${}
 * the result will be computed as a string
 * and included at that position
 *  "half of 100 is 50"
 * 
 * 
 */

// Urnary Operators
/**
 * operators that use two values are binary operators
 * 
 * operators that use single value urnary operators
 * 
 * minus is both binary and urnary operator
 * 
 * Binary operators
 * <>, >=, <==, == !=
 * 
 * 
 */

console.log(- (10 -2 ))
// -8

/**
 *
 */

console.log("Itchy" != "Scratchy")

console.log)("Apple" == "Orange")


/**
 * NaN (not a number)
 * 
 */

console.log(NaN == NaN)
// false

/**
 * denotes result of nonsensical computation
 * not equal to the result of any 
 * other nonsensical computations
 */


// Logical Operators

/**
 * and, or, and, not 
 * 
 * uses to reason about booleans
 * 
 * the && operator. represents logical and
 * 
 * a binary operator 
 * 
 * the result true
 * only if both valuels given to it are true
 */

console.log(true && false)
// false

console.log(true && true)
// true

/**
 * || operator denontes logical or
 * 
 * produces true 
 * 
 * if either of the 
 * values give to is true
 */

console.log(false || true)
// true

console.log(false || false)
// false

/**
 * not written as eclamation mark
 * 
 * flips value given to it !true produces false
 * !false produces true
 * 
 * == will give true when 
 * both values are the same
 * produces true only if both sides
 * are one of null or undefined
 * 
 * console.log(null == undefined);
 * // true
 * 
 * console.log(null == 0);
 * // false
 * 
 * go test for real value instead of null 
 * you can compare it to null with 
 * the == (or !=) operator
 * 
 * 
 * 
 * use === defensively to prevent unexpected type
 * conversion from tripping you up
 */

// Short-circuiting of logical operators

/**
 * logical operators && and || handle values
 * of different types in a peculiar way
 *      - convert value on their _____ side
 *        to boolean type, to decide what to do
 * 
 *        will return either orginal left-hand value
 *        or right-hand value depending on operator
 *        and the resut of that conversion
 * 
 *  || will return value to left when 
 *  that can be converted to true and 
 *  will return value on right otherwise
 */

console.log(null || "user")

console.log("Agnes" || "user")

/**
 * fall back on a default value
 * if value is empty use || after
 * with replacement value 
 * 
 * rules for converting strings and numbers to Boolean 
 * state 0 NaN and empty sting("") count as false
 * 
 * while other values count as true
 * 
 * 0 || -1 
 *  produces -1
 * 
 * 
 * "" || "!?" yields "!?"
 * 
 * && operator works other way around
 * 
 * when value converts to false
 * returns that value returns value on its right
 * 
 * the part on the right is only evaluated 
 * when necessary 
 * 
 * short circuit evaluation 
 */

