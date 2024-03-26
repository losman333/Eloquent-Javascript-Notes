// Parsing

/**
 * parser program reads text produces data
 * structure reflects structure of program
 * parser points out if program not valid 
 * 
 * create language 
 * 
 * simple uniform syntax
 * egg name of program
 * expression name of building number string or application
 * applications used for function calls, constructs if and while
 * no backslash, strings sequence of characters
 * A number is a sequence of digits
 * applications written using parentheses after expression
 * and having number of arguments between parentheses, seperated by commas
 * 
 */

do(define(x, 10),
    if(>(x, 5),
    print("large"),
    print("small")))

/**
 * do construct represent doing multiple things
 * 
 * date structure parser uses consists of 
 * expression objects has a type property
 * indicating kind of expression it is and other
 * properties to describe content
 * 
 * type "value" respresent literal strings, numbers
 * value property contains string or number value
 * they represent
 * 
 * Expression of type word used for indentifiers(name)
 * objects have a name property holds identifieres name
 * as string. 
 * 
 * "apply" expressions represent applications has operator
 * property referes to expression being applied as well
 * as args property holds an array of arguement
 * expressions. 
 * >(x, 5) represented like this
 */

{
    type: "apply",
    operator: {type: "word", name: ">"},
    args: [
        {type: "word", name: "x"},
        {type: "value", value: 5}
    ]
}

/**
 * data stucture called a syntax tree
 * application expressions contain other expressions like tree branches
 * expression have a recursive structure not sepreated into lines
 * 
 * write a parser that is recursive that reflects recursive nature of 
 * language
 * 
 * define function parseExpresssion takes a string as input
 * returns object containing data structure for expression
 * at start of string along with string after parseing
 * 
 * text may in contain arguements or may be closing
 * parenthesis that ends list of arguments
 * first part of parser
 */
function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match =/^"([^"])"/.exec(program)) {
        expr = {type: "value", value: match[1]};
    }   else if (match = /^\d+\b//.exec(program)) {
        expr = {type: "value", value: Number(match[0])};
    }   expr = {type: "word", name: match[0]};
    
}

// Evaluator

// Special forms
//The enviornment
//Functions
//Compilation
//Cheating
//Exercises


