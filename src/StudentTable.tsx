import { DataTable } from './Table';
import { createColumnHelper } from "@tanstack/react-table";

export type Student = {
    id: string;
    firstName: string;
    lastName: string;
    ssn: string;
    dob: Date;
};

export type StudentTableProps = {
    students: Student[]
}

const columnHelper = createColumnHelper<Student>()

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "ID"
    }),
    columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        header: "First Name"
    }),
    columnHelper.accessor("lastName", {
        cell: (info) => info.getValue(),
        header: "Last Name"
    }),
    columnHelper.accessor("ssn", {
        cell: (info) => info.getValue(),
        header: "SSN"
    }),
    columnHelper.accessor("dob", {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: "Date of Birth",
    })
];

export const StudentTable = ({ students }: StudentTableProps) => {

    return (
        <DataTable data={students} columns={columns} />
    )
}