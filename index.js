const { log } = require('console');
const fs = require('fs');
const testcase1 = 'testcase_1.json';
const testcase2 = 'testcase_2.json';

// Function to decode a value from a given base to decimal
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation function to find the constant term (c)
function lagrangeInterpolation(points) {
    let c = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const [x_i, y_i] = points[i];
        let L_i = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                L_i *= x_i / (x_i - points[j][0]);
            }
        }

        c += L_i * y_i;
    }

    return c;
}

// Reading and parsing to object
function readInput(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
}

// Main function to solve the problem
function main() {
    const input = readInput(testcase2); 
    const n = input.keys.n;
    console.log("n: ", n);
    
    const k = input.keys.k;
    const points = [];

    // Decode the y values and store the points
    for (const key in input) {
        // Only process keys that are numeric and not 'keys'
        if (!isNaN(key) && input[key]) {
            const base = parseInt(input[key].base, 10);
            const value = input[key].value;
            const decodedValue = decodeValue(value, base);
            console.log(decodedValue);
            
            points.push([parseInt(key, 10), decodedValue]);
        }
    }
    console.log(points);
    

    // Check if we have enough points
    if (points.length < k) {
        console.error(`Not enough points to perform interpolation. Required: ${k}, Found: ${points.length}`);
        return;
    }

    // Use the first k points for interpolation (as k = m + 1)
    const secretC = lagrangeInterpolation(points.slice(0, k));
    
    console.log(`The constant term c is: ${secretC}`);
}

// Execute the main function
main();
