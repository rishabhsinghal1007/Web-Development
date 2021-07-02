// let obj = {
//     "firstName": "rishabh",
//     "lastName": "singhal",
//     "name": function () {
//         console.log(this);
//         return this.firstName + " " + this.lastName;
//     }
// }
// // method call
// // (this) represent object
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

// console.log(obj.name());
// let fn = obj.name;
// console.log(fn());

// let obj = {
//     "firstName": "rishabh",
//     "lastName": "singhal",
//     "name": function (string) {
//         console.log(this);
//         return this.firstName + " " + this.lastName + " " + string;
//     }
// }

// console.log(obj.name());
// let fn = obj.name.bind(this, "hello");
//  console.log(fn());

// document.querySelector("button").addEventListener("click", function () {
//     console.log(this);
// });

// document.querySelector("button").addEventListener("click", () => {
//     console.log(this);
// });

// setTimeout(function () {
//     console.log(this);
// }, 1000)

// setTimeout(() => {
//     console.log(this);
// }, 1000);

// let obj = {
//     "name": "Rishabh",
//     "hello": {
//         "fn": function () {
//             console.log(this);
//         }
//     }
// }

// let obj = {
//     "name": "Rishabh",
//     "hello": {
//         "fn": () => {
//             console.log(this);
//         }
//     }
// }

// obj.hello.fn();

// const object = {
//     message: 'Hello, World!',
//     logMessage: function () {
//         console.log(this);
//         // What is logged?
//     }
// };

// function call so its window
// let fn = object.logMessage; 
// fn();

// let fn = object.logMessage;
// setTimeout(fn, 1000); // output - window


// this will represent to the element on which eventlistener is implemented
// document.querySelector("button").addEventListener("click", fn);


// this will not represent to settimeout, it will represnt to window 
// setTimeout(function outer() {
//     object.logMessage(); 
// }, 1000);


// this will be overrided in this case, No need to check where this will be pointing.
// let boundFn = object.logMessage.bind(object);
// setTimeout(boundFn, 1000); 

const object = {
    who: 'World',
    greet() {
        return `Hello, ${this.who}!`;
    },
    farewell: () => {
        return `Goodbye, ${this.who}!`;
    }
};
console.log(object.greet()); // What is logged?
console.log(object.farewell()); // What is logged?  