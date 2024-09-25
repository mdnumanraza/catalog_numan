const fs = require('fs');
const testcases = ['testcase_1.json', 'testcase_2.json','own_testcase.json','own_testcase2.json']

// Function to decode a value from a given base to decimal
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation function 
function lagrangeInterpolation(points) {
    let c = 0; 
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const [x_i, y_i] = points[i]; 
        let L_i = 1; // Initialize the Lagrange basis polynomial

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                // Construct L_i(0) by evaluating the basis polynomial at x = 0
                L_i *= (0 - points[j][0]) / (x_i - points[j][0]);
            }
        }

        // Add the contribution of the current basis polynomial to c
        c += L_i * y_i;
    }

    return c; 
}



// Reading and parsing to object
function readInput(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
}

 
/*
for testing i am using testcase from own_testcase.json 
my input points are
 { (1,2) , (2,3), (3,5)}
after solving using langranges interpolation method
I got polynomial as: P(x) = 1/2 x^2 - 1/2 x + 2
by keeping x = 0 in P(x), I can get constant as : 2
*/ 

// Main function
function main() {
    const input = readInput(testcases[2]); 
    const n = input.keys.n;
    console.log("n: ", n);
    
    const k = input.keys.k;
    const points = [];

    // Decode the y values and store the points
    for (const key in input) {
        if (!isNaN(key) && input[key]) {
            const base = parseInt(input[key].base, 10);
            const value = input[key].value;

            //getting y value after decoding to decimal
            const decodedValue = decodeValue(value, base);
            console.log(decodedValue);
            //pushing {x,y}
            points.push([parseInt(key, 10), decodedValue]);
        }
    }
    console.log(points);
    

    // Check if we have enough points
    if (points.length < k) {
        console.error(`Not enough points to perform interpolation. Required: ${k}, Found: ${points.length}`);
        return;
    }

    // slicing array to get the first k points for interpolation (as k = m + 1)
    const secretC = lagrangeInterpolation(points.slice(0, k));
    
    console.log(`The constant term c is: ${secretC}`);
}


main();
