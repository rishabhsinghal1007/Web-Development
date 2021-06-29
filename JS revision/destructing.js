// const user = {
//     id: 339,
//     name: 'Fred',
//     age: 42,
//     education: {
//         degree: 'Masters',
//         school: {
//             name: 'SPS',
//             location: 'Pitampura'
//         }
//     },
//     friends: ["Falcon", "Bucky"]
// };


// 1st method

// let degree = user.education.degree;

// 2nd MEthod

// let { education: { degree } } = user;
// console.log(degree);

// let { education: { school: { name, location } } } = user;
// console.log(name, location);

// let friends = user.friends;
// let { friends } = user;
// console.log(friends);


// let obj1 = {
//     "name": "rishabh"
// }
// let obj2 = { ...obj1 };  // making a copy
// obj2.name = "rish";

// console.log(obj2);

let obj1 = {
    "name": "rishabh",
    "profession": {
        "company": "amazon"
    }
}

// Shallow copy
// let obj2 = { ...obj1 }; // this makes a copy for level1
// obj2.profession.company = "squareboat";
// console.log(obj1);
// output : { name: 'rishabh', profession: { company: 'squareboat' } }

// Deep Copy Method-1
// console.log(JSON.stringify(obj1));
// let obj2 = JSON.parse(JSON.stringify(obj1));
// obj2.profession.company = "squareboat";
// console.log(obj1);

// Deep Copy Method-2
let obj2 = {};
for (let i = 0; i < Object.keys(obj1).length; i++) {
    if (typeof (obj1[Object.keys(obj1)[i]]) == "object") {
        obj2[Object.keys(obj1)[i]] = { ...obj1[Object.keys(obj1)[i]] };
    } else {
        obj2[Object.keys(obj1)[i]] = obj1[Object.keys(obj1)[i]];
    }
}

obj2.profession.company = "squareboat";

console.log(obj1, obj2);