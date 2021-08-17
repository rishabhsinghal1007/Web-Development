// implementation of a feature if it doesn't exist in client machine/ software
// library
Object.prototype.forEach = function () {
    // console.log(this);
    // loop

    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            cb(this[key]);
        }
    }

};

// code
let obj = {
    "name": "rishabh",
    lastname: "singhal",
    age: 21
};

let obj1 = {
    "name": "steve",
    lastname: "rogers",
    age: 26
};

obj.forEach();
function cb(elem) {
    console.log('value of object', elem);
}
obj1.forEach(cb);

