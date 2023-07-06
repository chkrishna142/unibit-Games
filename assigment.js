
// Question :- . Given an array of integers and a target value, you must determine which two integers' sum
// equals the target and return a 2D array. Then merge the array into a single array with sorting (
//     ascending ) order, in the next step double the target value and find again the combination of
//     digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
//     array.
//     Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
//     Target Value = 4,
//     Output: First Combination For “4” : [ [1,3],[2,2],[-4,8] ];
//     Merge Into a single Array : [-4,1,2,2,3,8];
//     Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],[-4,1,3,8],[8] ]


function findSumWithSet(arr, target) {//time complexity o(n)
    const output = [];           // output[] array for storing answer
    const set = new Set();       // Set to check whether a number is present or not

    for (let i = 0; i < arr.length; i++) {
        const check = target - arr[i]; //check is a number to check of possible pair

        if (set.has(check)) {
            output.push([arr[i], check]);   // if check is present then add the present array element and the check number
        } else {
            set.add(arr[i]);               // if set doesn't contain check then add only check
        }
    }

    return output;
}


// Time complexity of the findSumWithSet function using the set method is O(n), where n is the length of the input array.
//  We can do the same with Two Pointer technique


function findSumWithTwoPointers(arr, target) { //time complexity o(n log n)
    const output = [];      // output[] array for storing answer
    arr.sort((a, b) => a - b);  //Sort the array for applying two pointer

    let left = 0;           // first pinter
    let right = arr.length - 1; // second pointer

    while (left < right) {
        const sum = arr[left] + arr[right];   //sum is sum of both pointer's element

        if (sum === target) {               //if sum is equal to target then add both elements in output array
            output.push([arr[left], arr[right]]);
            left++;    //check for other possibilities by increasing left pointer and decreasing right pointer
            right--;
        } else if (sum < target) {
            left++;    //if the sum is less than target then increase only left pointer
        } else {
            right--;   // if sum is greater then decrease right pointer
        }
    }

    return output;
}
// Time complexity of the findSumWithTwoPointers function using the Two Pointer method is  O(n log n), where n is the length of the input array.

const arr = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;

const result1 = findSumWithSet(arr, target);
console.log("First Combination For “4” : "); console.log(result1);

//* Then merge the array into a single array using Flat method with sorting,,
const mergeArr = result1.flat().sort((a, b) => a - b);  // time complexity o(n log n)
console.log("Merge Into a single Array : "); console.log(mergeArr);


function equalArrayCheck(arr1, arr2) {
    if (arr1.length !== arr2.length) {  //if both the array are different in length then return false
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {   //else iterate and check both array's elements
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function duplicate(presentSeq, result) {  //check for duplicate results
    for (const arr of result) {     // iterate through result
        if (equalArrayCheck(presentSeq, arr)) {  //check for present Subsequence is already there is result or not
            return true;
        }
    }
    return false;
}

function backtrack(mergeArr, doubletarget, ind, presentSeq, result) {
    if (doubletarget === 0 && !duplicate(presentSeq, result)) {   //check whether the target number is reached and check for duplicates
        result.push([...presentSeq]); //then add the possible array into the result answer
        return;
    }

    if (ind === mergeArr.length || doubletarget < 0) {  // base case
        return;                                         // // If the index exceeds the array length or the target value becomes negative
    }

    for (let i = ind; i < mergeArr.length; i++) {
        presentSeq.push(mergeArr[i]);// Add the current element to the presentSubsequence 
        backtrack(mergeArr, doubletarget - mergeArr[i], i + 1, presentSeq, result);// Recursively call the backtrack function with updated target value and index
        presentSeq.pop(); // Remove the current element from the current subsequence
    }
}


function findSubseqWithSum(mergeArr, doubletarget) {
    const result = [];   // to store all possible answers
    const presentSeq = []; // to store each possible answer
    backtrack(mergeArr, doubletarget, 0, presentSeq, result);  //using backtracking technique which starts wit 0 index
    return result;
}
//time complexity for findSubseqWithSum is o(2^n*2)


//Thir part of the question 
const doubletarget = 8;  //double the target
const subsequences = findSubseqWithSum(mergeArr, doubletarget);  //find all subsequence

console.log("Second Combination For “8” : ");
console.log("[");
subsequences.forEach(subsequence => {
    console.log(subsequence);
});
console.log("]");