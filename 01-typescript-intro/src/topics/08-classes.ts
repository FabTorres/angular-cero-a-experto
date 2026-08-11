export class Person {
    public name: string;
    public address: string;

    constructor(name: string, address: string = 'No Address') {
        this.name = name;
        this.address = address;
    }

}

export class Hero {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ) {

    }


}


const person = new Person('Fabio', 'New York');
const ironman = new Hero('Fabio', 23, 'Fabi', person);
console.log(ironman);