import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../components/adminColumns";
import styles from "../styles/table.module.css";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const Prof = await res.json();
  return {
    props: { Prof },
  };
};

export default function Admin({ Prof }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Prof, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }); ///this object is in shorthand

  return (
    <div className={styles.table}>
      <table style={{ width: "100%" }} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
          <tr style={{}}>
            <th style={{}}></th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={4} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td style={{}}></td>
          </tr>
        </tbody>
      </table>
    </div>

    // <div>
    //    {Prof.map((p) => {
    //     return (
    //       <div key={p.Prof}>
    //         <p>
    //           {p.Email}
    //           {p.Pass}
    //           {p.MainDate}
    //           {p.Campus}
    //           {p.MainTime}
    //           {p.Cubicle}
    //           {p.WholeName}
    //         </p>
    //       </div>
    //     );
    //   })}
    //  </div>
  );
}
