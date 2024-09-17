
function F1(x) {
    return x * x - Math.cos(x);
}
function F2(x) {
    return x * x * x + Math.sin(x);
}
function F3(x) {
    return x * x - x + 1;
}

function LRS(f, a, b){
    return f(a) * (b-a)
}
function LRR(f, a, b){
    return f(b) * (b-a)
}
/**
 * Approximates the definite integral of f(x) over the interval [a, b] using the midpoint rule.
 * @param {function} f - The function to integrate.
 * @param {number} a - The lower bound of the interval.
 * @param {number} b - The upper bound of the interval.
 * @returns {number} The approximate integral value.
 */
function MidpointRule(f, a, b){
    return f((a+b)/2) * (b-a)
}

const funcs = [F1, F2, F3]
const methods = [LRS, LRR, MidpointRule]
function integrate(func, method, a, b,accuracy=0.001, limit = 100) {
    let prevVal = 0;
    let curVal = 0;
    let steps = 2;

    // first iteration
    let res = 0;
    let delta = (b - a) / steps;


    for (let i = 0; i < steps; i += 1) {
        res += method(func, a + i*delta, a + (i+1)*delta);
    }
    curVal = res;

    steps = steps * 2;
    i = 0;

    while (Math.abs(prevVal - curVal) > accuracy && i < limit)  {

        res = 0;
        delta = (b - a) / steps;
        
        for (let j = 0; j < steps; j += 1) {
            res += method(func, a + j*delta, a + (j+1)*delta);
        }
        prevVal = curVal;
        curVal = res;

        steps = steps * 2;

        i+=1;

    }


    return res;
}

let a = parseFloat(prompt('Enter a: '));
let b = parseFloat(prompt('Enter b: '));

funcs.forEach(func => {
    console.log(func.name);
    methods.forEach(method => {
        console.log("\t" + method.name);
        console.log("\t\tres=" + integrate(func, method, a, b))
    })
})

