class Person {
    // constructor method
    constructor(name) { 
        this.name = name;
        this.company = "Amazon";
    }
    // normal method
    setDetails(name, occupation) {
        this.name = name;
        this.occupation = occupation;
    }

    getDetails = () => {
        console.log(this);
    }

    // getDetails() {
    //     console.log(this);
    // }
}

// let obj1 = new Person();
// obj1.setDetails("Rishabh", "SDE");
// obj1["Company"] = "amazon"; 
// console.log(obj1);;

// let obj2 = new Person();
// obj2.setDetails("Himanshu", "SDE");
// console.log(obj2);

// let obj3 = new Person("Rishabh");
// console.log(obj3);

let obj4 = new Person("Rishabh");
document.querySelector("button").addEventListener("click", obj4.getDetails);

