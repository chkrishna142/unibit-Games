
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