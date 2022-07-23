'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

var solved = false;
var set = new Set();

function abbreviation(a, b) {
    if (solved) return true;
    
    // Base case when A is empty
    if (a.length == 0) {
        // TRUE if B is also empty
        // FALSE if it's not
        if (b.length == 0) {
            solved = true;
            return true;            
        } else {
            return false;
        }
    }
    
    // Base case when B is empty
    if (b.length == 0) {
        // TRUE if all chars in A can be deleted
        // FALSE if they can't
        if (a.toLowerCase() === a) {
            solved = true;
            return true;
        } else {
            return false;
        }
    }
    
    if (set.has(JSON.stringify({a,b}))) return false;
    set.add(JSON.stringify({a,b}));
    
    // Dynamic programming
    // For each possibility, a new recursion branch is created
    // 1. Lowercase chars simultaneously in A and B create two branches
    // 2. Uppercase chars simultaneously in A and B create a single branch
    // 3. Lowercase chars in A but not in B create a single branch
    // 4. Uppercase chars in A but not in em B don't create any branch
    if (a.charAt(0).toUpperCase() == b.charAt(0)) {
        // If A's and B's first char is lowercase
        // try to solve it when A's char is deleted and when it's capitalized
        return abbreviation(a.substring(1), b.substring(1)) || abbreviation(a.substring(1), b);
    } else if (a.charAt(0) == b.charAt(0)) {
        // If A's first char is uppercase, just proceed on branch
        return abbreviation(a.substring(1), b.substring(1));
    } else if (a.charAt(0).toLowerCase() == a.charAt(0)){
        // If they are not the same letter but A's first char is lowercase
        // delete A's first char
        return abbreviation(a.substring(1), b)
    } else {
        // If A's and B's first chars are not the same letter
        // and A's first char is lowercase
        // stop this branch
        return false;
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();
        
        solved = false;

        const result = abbreviation(a, b);

        ws.write((result ? "YES" : "NO") + '\n');
    }

    ws.end();
}
