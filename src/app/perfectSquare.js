let no = 49;

for (i = 1; i <= no; i++) {
    console.log(i * i);
    if (i * i == no) {
        console.log("perfect square ");
    } else {
        console.log("not square");
    }
}

function isPerfectSquare(x) {
    let left = 1,
        right = x;

    while (left <= right) {
        console.log("right: " + right, "left: " + left);

        let mid = Math.floor((left + right) / 2);

        console.log(mid);
        // Check if mid is perfect square
        if (mid * mid == x) {
            console.log(mid);
            return true;
        }

        // Mid is small -> go right to increase mid
        if (mid * mid < x) {
            console.log("left: " + left, "mid: " + mid);
            left = mid + 1;
            console.log("left: " + left, "mid: " + mid);
        }

        // Mid is large -> to left to decrease mid
        else {
            console.log("right: " + right, "mid: " + mid);
            right = mid - 1;
            console.log("right: " + right, "mid: " + mid);
        }
    }
    return false;
}

// Driver Code
let x = 4;

// Function Call
if (isPerfectSquare(x)) console.log("Yes");
else console.log("No");
let input = 98765;
let reversedNum = 0;
while (input != 0) {
    console.log(input % 10, "rnum: " + reversedNum);

    reversedNum = Math.floor(reversedNum * 10 + (input % 10));
    console.log(reversedNum);
    input = Math.floor(input / 10);
    console.log(input);
}
console.log(input, reversedNum);
let result = input % 10;

console.log(result);