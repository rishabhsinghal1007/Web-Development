// let obj = {
//     "firstName": "rishabh",
//     "lastName": "singhal",
//     "name": function () {
//         console.log(this);
//         return this.firstName + " " + this.lastName;
//     }
// }
// // method call
// // this represent object
// console.log(obj.name());

// let fn = obj.name;
// // function call
// console.log(fn());

// let obj = {
//     "firstName": "rishabh",
//     "lastName": "singhal",
//     "name": () => {
//         console.log(this);
//         return this.firstName + " " + this.lastName;
//     }
// }
// // 1 level above
// console.log(obj.name());
// let fn = obj.name;
// console.log(fn());

let obj = {
    "firstName": "rishabh",
    "lastName": "singhal",
    "name": function (string) {
        return this.firstName + " " + this.lastName + " " + string;
    }
}

console.log(obj.name());
let fn = obj.name.bind(this, "hello");
console.log(fn());

