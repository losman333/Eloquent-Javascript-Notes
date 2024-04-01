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
 * 
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
    }   else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0])};
    }   else if (match = /^[^\s(),#]"+/ .exec(program)) {
        expr = {type: "word", name: match[0]};
    }   else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseAppy(expr, program.slice(match[0].length));

}

function skipSpace(string){
    let resit = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

/**
 * skip space cuts white space off start of program string
 * 
 * after skipping leading space, parseExpression uses three
 * regular expressions to spot three atomic elements that egg supports
 * strings, numbers and words
 * parser constructs different data sctructure depending on match
 * 
 * if input does not match one of three forms not valid expression
 * parser throws error
 * SyntaxError more specific instead of error
 * also error type thrown when an attempt is made to run
 * invalid JavasScript program
 * 
 * cut of part that matched from program string and with object for 
 * expression to parseApply checks whether expression is an application
 * if so parses parenthesized list arguments 
 */

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(") {
        return {expr: expr, rest: program};
    }
    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (prgram[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

/**
 * if next character in program is not openeing parenthesis
 * not an application parseApply return expression given
 * otherwise skips openening parenthesis creates
 * syntax tree object for application expression
 * recursively call parseExpression to parse each argument
 * until closing parenthesis found
 * 
 * recursion is indirect through parseApply and
 * parseExpression calling each other
 * 
 * Application expression can be applied (such as in multiplier(2)(1))
 * parseApply after parsing application call itself again to check whether
 * another pair of parentheses follows all that is needed to parse egg
 * 
 * wrap it in a convenient parse function that verifies it has reached
 * end of the input string after pasing expression egg program
 * is a single expression gives program data structure
 */

function parse(program) {
let {expr, rest} = parseExpression(program);
if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
}
return expr;

}

console.log(parse("+(a, 10)"));
 {type: "apply", 
    operator: {type: "word", name: "+"},
    args: [{type: "word", name: "a"}, 
            {type: "value", value: 10}]}

// Evaluator

/**
 * evaluator has code for each expression types
 * literal value expression produces value
 * expression 100 evaluates to number 100
 * for binding must check whether actually defined in
 * scope if defined fetch bindings value
 * 
 * applications more involved special form like if
 * we don not evaluate anyting pass argument expressions
 * along with scope to function that handlers form
 * if normal call evaluate operator verifiy it is a function
 * call with evaluated arguments
 * 
 * recursive strcuture of evaluate resembles similar
 * structure of parser both mirror structure of language
 * itself would be possible to integrate parser with 
 * evaluator and evaluate during parsing splitting
 * up makes program clearer
 * all that is needed to interpret eg
 * 
 * 
 */
// Special forms

/**
 * specialForms object used to define special syntax in EGG
 * associates words with function that evaluate such forms
 * currently empty add if
 */

specialForms.if = (args, scope) => {
    if (args.length != 3 ) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

/**
 * if construct expects 3 arguements will evaluate first
 * if result isnt value false will evaluate second otherwise
 * third get evaluated
 * if form is more similar to JS ternary ?: operator than JS if
 * an expression not statement produces value, namely result
 * of second or third argument
 * 
 * egg differs with conditional value if will not treat things 
 * like zero or empty string as false only precise value false
 * 
 * arguements to function evaluated before function called
 * represent if as special form rather than reg function
 * if should evaluate only either its second or third 
 * argument depending on value of first
 * while form is simiilar
 */

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args of while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }



// undefined doesn not exist in egg return false
// for lack of meaningful result 
return false;
};

/**
 * do executes arguements from top bottom
 * value is value produced by las argument
 */

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value
}

/**
 * form define used to create binds give new values
 * expects word as it first argument expression
 * producing value to assign word
 * as second argument. Define is an expression
 * must return a value. Return value that was assigned
 * like JS = operator
 */

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incoorect use of define");
    }
    let vaue = evaluate(args[1], scope);
    scop[args[0].name] = value;
    return value;
};

//The enviornment
/**
 * scope accepted by evaluate is object with properties names
 * correspond to binding names values correspond to 
 * values binding are bound to. Define object to represent
 * global scope
 * 
 * to use if construct must have boolean values. Bind names
 * to values true an false
 */

const topScope = Object.create(null);

topScope.true = true;
topScope.flase = false;

let prog = parse(`if(true, flase, true)`);
console.log(evalute(prog, topScope));

/**
 * add function values to scope to keep code short
 * use Function to synthesize operator functions
 * in loop instead of defining individually
 */

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

/**
 * wrap console.log in function call it print
 * 
 */

topScope.pring = value => {
    console.log(value);
    return value;
};

/**
 * function provides convienent way to parse program and run fresh scope
 */

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

/**
 * use object prototypes chains to represent nested scopes 
 * so program can dd bindinds to local scop without 
 * changin top-level scope
 */

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`)

//Functions

/**
 * fun construct treats last arg as func body
 * uses all args before as names of func parameters
 */

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("Function need a body");
    }
    let body = args[args.length -1];
    let params = args.slice(0, args.length -1).map(expr => {
        if (expr .type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function() {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguements");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

/**
 * functions in egg get own local scope
 * func produced by fun form creates local scope 
 * adds arguments bindings to it
 * evaluates function body in this scope returns result
 */

run(`
do(define(plusOne, fun(a, +(a, 1))), 
    print(plusOne(10)))
`);

run(`
do(define(pow, fun(base, exp, 
        if(==(exp, 0), 
        1,
        *(base, pow(base, -(exp, 1)))))),
    print(pow(2, 10)))

`);
//Compilation
/**
 * process of adding another stip between parsing and running of program
 * which transforms program into something to be evaluated 
 * by doing as much work in advance
 * for each use of binding, binding is referred to without actually
 * running program
 * can be used to avoid looking up binding by name when accessed
 * instead directly fetching from predeteremined memory location
 * 
 * traditionl compilation converts program to machine code
 * process that converts program to different representation
 * consdiderd compilation
 * 
 * possible to write alternative evaluation strategy
 * converts program to JavaScript usese function
 * to invoke JS Function to invoke JS compiler on it
 * runs result 
 */
//Cheating

/**
 * domain-specific language language 
 * tailored to express a narrow domain of knowledge
 * more expressive because describes exactly things
 * that need to be described in its domain
 */

//Exercises

/**
 * Arrays
 * add support for arrays to Egg by adding following
 * three function to top scope array, values to construct
 * array containing argument values, length(array)
 * to get an arrays length and element array, n to fetch elment from an array
 * 
 * 
 */


/**
 * closure
 * 
 */

