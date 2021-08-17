// function fakeFN() {
//     console.log(arguments); // like an array
//     console.log('I was executed');
// }
// Js -> function overloading is not possible
// fakeFN(10, 20, 30);
// arr = [1, 2, 3];

// arr.push(...items) - adds items is not possible

// *************** in javascript array is an object 
// *************** we dont have arrays in javascript
// int[] arr = [1, 2, 3, 4, 5];
// const arr = [1, 2, 3, 4, 5];
// arr.unshift();
// arr.shift();

// arr[95] = "10";
// splice -> remove n number of elements starting from an index
// return an array of removed elements
// arr.splice(2, 1);
// console.log(arr);

// slice - returns a copy of an array



// HOF(high order functions) -> function that accepts a function as an arguments or returns a function

// forEach, map, filter, reduce, sort -> every HOF returns a new array and doesn't mutate an old array
// implement any of these HOF

let arr = [1, 2, 3, 4, 5];

// 1. ForEach -> Iterate 
// return undefined -> alternative to for Loop
// arr.forEach(cb);
// function cb(elem) {
//     console.log("No is", elem);
// }

//2. map is used for transform an array
// let sqArr = arr.map(applyMeToEveryElemOfTheAttachedArr);
// function applyMeToEveryElemOfTheAttachedArr(elem) {
//     return elem * elem;
// }
// console.log(sqArr);

