import { Student } from "./StudentTable"
const exampleStudents: Student[] = [{ id: "1", firstName: "Jeffrey", lastName: "Cheng", dob: new Date(1994, 1, 9), ssn: "111-111-1111" }]


export const fetchStudents = async () => {
    const promise: Promise<Student[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(exampleStudents);
        }, 5000);
    });
    return await promise
}


export const createStudent = ({ firstName, lastName, ssn, dob }: { firstName: string, lastName: string, ssn: string, dob: Date }) => {
    const promise: Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
        }, 1000);
    });
    return promise
}
