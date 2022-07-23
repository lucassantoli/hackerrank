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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
    // Function to check if two arrays have sorted alternating elements
    function doInterleave (arrA, arrB) {
        var interleaved = [
            ...arrA.map(el => ({arr: 1, val: el})),
            ...arrB.map(el => ({arr: 2, val: el}))];
        
        interleaved.sort((a,b) => b.val - a.val)
        
        for (let i = 1; i < interleaved.length; i++) {
            if (interleaved[i].arr == interleaved[i-1].arr) return false;
        }
        
        return true;
    }
    
    let letters = {};
    // For each letter in the string, create a property that contains its indexes
    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (letters[char]) {
            letters[char].push(i);
        } else {
            letters[char] = [i];
        }
    }
    
    let minChanges = 0;
    
    // Get all the letters of the string
    let keyLetters = Object.keys(letters);
    for (let i = 0; i < keyLetters.length; i++) {
        for (let j = i+1; j < keyLetters.length; j++) {
            let letter1 = keyLetters[i];
            let letter2 = keyLetters[j];
            // Test every pair to check if they alternates
            if (doInterleave(letters[letter1], letters[letter2])) {
                let resultantLength = letters[letter1].length + letters[letter2].length;
                // Update minChanges if the new result string more elements than the previous one
                minChanges = Math.max(minChanges, resultantLength);
            }
        }
    }
    
    return minChanges;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}
