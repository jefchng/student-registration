import { Student } from "./StudentsTable"

const exampleStudents: Student[] = [
    {
        id: "1", firstName: "John", lastName: "Doe", dob: new Date(2000, 0, 1), ssn: "111-11-1111", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
    },
    {
        id: "2", firstName: "Jane", lastName: "Doe", dob: new Date(2000, 1, 1), ssn: "111-11-1112", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
    },
]


export const fetchStudents = async () => {
    console.log("Fetching")
    const promise: Promise<Student[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(exampleStudents);
        }, 5000);
    });
    return await promise
}


export const createStudent = ({ firstName, lastName, ssn, dob }: { firstName: string, lastName: string, ssn: string, dob: Date }) => {
    alert(JSON.stringify({ firstName, lastName, ssn, dob }, null, 2))
    const promise: Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
        }, 1000);
    });
    return promise
}
