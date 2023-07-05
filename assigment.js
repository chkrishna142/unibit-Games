
function findSumWithSet(arr, target) {
    const output = [];
    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
        const check = target - arr[i];

        if (set.has(check)) {
            output.push([arr[i], check]);
        } else {
            set.add(arr[i]);
        }
    }

    return output;
}

const arr = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;

const result1 = findSumWithSet(arr, target);
console.log("First Combination For “4” : "); console.log(result1);


const mergeArr = result1.flat().sort((a, b) => a - b);
console.log("Merge Into a single Array : "); console.log(mergeArr);


function equalArrayCheck(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function duplicate(presentSeq, result) {
    for (const arr of result) {
        if (equalArrayCheck(presentSeq, arr)) {
            return true;
        }
    }
    return false;
}

function backtrack(mergeArr, doubletarget, ind, presentSeq, result) {
    if (doubletarget === 0 && !duplicate(presentSeq, result)) {
        result.push([...presentSeq]);
        return;
    }

    if (ind === mergeArr.length || doubletarget < 0) {
        return;
    }

    for (let i = ind; i < mergeArr.length; i++) {
        presentSeq.push(mergeArr[i]);
        backtrack(mergeArr, doubletarget - mergeArr[i], i + 1, presentSeq, result);
        presentSeq.pop();
    }
}


function findSubseqWithSum(mergeArr, doubletarget) {
    const result = [];
    const presentSeq = [];
    backtrack(mergeArr, doubletarget, 0, presentSeq, result);
    return result;
}








const doubletarget = 8;
const subsequences = findSubseqWithSum(mergeArr, doubletarget);

console.log("Second Combination For “8” : ");
console.log("[");
subsequences.forEach(subsequence => {
    console.log(subsequence);
});
console.log("]");