export interface Passenger {
    name: string;
    children?: string[];

}

const passenger1: Passenger = {
    name: 'Fabio',
}

const passenger2: Passenger = {
    name: 'Romina',
    children: ['Maria', 'Juan']
}

const returnChildrenNumber = (passenger: Passenger) => {
    const howManyChildren = passenger.children?.length || 0;
    return howManyChildren;
}

returnChildrenNumber(passenger1);
