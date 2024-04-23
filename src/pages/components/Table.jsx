import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

export default function TableComponent({ COLUMNS, Data }) {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => Data, []);

    const tableInstance = useTable({
        columns,
        data,
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <table {...getTableProps()} className="border border-black">
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((header) => (
                            <th {...header.getHeaderProps()}>
                                {header.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        <Link
                                            to={`./${row.original._id}`}
                                            className=""
                                        >
                                            {cell.render("Cell")}
                                        </Link>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
