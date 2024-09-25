
# Shamir's Secret Sharing 

## Overview
This project implements a simplified version of Shamir's Secret Sharing algorithm using Lagrange interpolation. It reads a set of points from a JSON file, decodes their y-values from various bases, and computes the constant term of the polynomial representing the secret using Lagrange interpolation.

## Files
- **index.js**: The main JavaScript file containing the implementation.
- **testcase_1.json**, **testcase_2.json**, **own_testcase.json**, **own_testcase2.json**: Sample input files containing the points for interpolation.

## Requirements
- Node.js

## How to Run
1. Ensure you have Node.js installed.
2. Clone or download this repository.
3. Navigate to the project directory in your terminal.
4. Run the command:
   ```bash
   node index.js
   ```
5. The output will display the constant term \( c \) calculated from the input points.

## Code Explanation

### Key Functions

#### 1. `decodeValue(value, base)`
Converts a number from a specified base to decimal.

**Parameters**:
- `value`: The number as a string.
- `base`: The base of the number.

**Returns**: The decoded number as an integer.

#### 2. `lagrangeInterpolation(points)`
Calculates the constant term \( c \) of the polynomial using Lagrange interpolation.

**Parameters**:
- `points`: An array of points, where each point is an array consisting of \([x, y]\).

**Returns**: The constant term \( c \).

### 3. `readInput(filename)`
Reads and parses the JSON input file.

**Parameters**:
- `filename`: The name of the JSON file.

**Returns**: The parsed JSON object.

### 4. `main()`
The main function orchestrates the entire process:
- Reads input data.
- Decodes y-values.
- Checks if there are enough points for interpolation.
- Calculates and displays the constant term.

## Dry Run Example

### Input
Consider the following JSON input stored in `own_testcase.json`:

```json
{
    "keys": {
        "n": 3,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "2"  // y value for x = 1
    },
    "2": {
        "base": "10",
        "value": "3"  // y value for x = 2
    },
    "3": {
        "base": "10",
        "value": "5"  // y value for x = 3
    }
}
```

### Steps

1. **Read Input**:
   The `readInput` function reads the JSON file and parses it. The output is:
   ```javascript
   {
       keys: { n: 3, k: 3 },
       1: { base: "10", value: "2" },
       2: { base: "10", value: "3" },
       3: { base: "10", value: "5" }
   }
   ```

2. **Decode y-values**:
   The `decodeValue` function processes each entry:
   - For \( (1, 2) \): base 10, value "2" → decodedValue = 2
   - For \( (2, 3) \): base 10, value "3" → decodedValue = 3
   - For \( (3, 5) \): base 10, value "5" → decodedValue = 5

   Resulting points array:
   ```javascript
   points = [[1, 2], [2, 3], [3, 5]]
   ```

3. **Check Points**:
   The function checks if there are enough points:
   - \( n = 3 \), \( k = 3 \) → Enough points to proceed.

4. **Lagrange Interpolation**:
   Call `lagrangeInterpolation(points)`:
   - For \( i = 0 \) (point (1, 2)):
     - \( L_0(0) = \left(0 - 2\right)/\left(1 - 2\right) \cdot \left(0 - 3\right)/\left(1 - 3\right) = 1 \)
     - Contribution to \( c \) = \( 1 \cdot 2 = 2 \)
   - For \( i = 1 \) (point (2, 3)):
     - \( L_1(0) = \left(0 - 1\right)/\left(2 - 1\right) \cdot \left(0 - 3\right)/\left(2 - 3\right) = 1 \)
     - Contribution to \( c \) = \( 1 \cdot 3 = 3 \)
   - For \( i = 2 \) (point (3, 5)):
     - \( L_2(0) = \left(0 - 1\right)/\left(3 - 1\right) \cdot \left(0 - 2\right)/\left(3 - 2\right) = 1 \)
     - Contribution to \( c \) = \( 1 \cdot 5 = 5 \)

5. **Final Calculation**:
   The total constant term \( c \):
   \[
   c = 2 + 3 + 5 = 10
   \]

### Output
The program outputs:
```
The constant term c is: 10
```

## Conclusion
This project provides a straightforward implementation of Shamir's Secret Sharing algorithm using Lagrange interpolation. By utilizing the provided JSON input format, users can easily calculate the secret from polynomial roots.

---

