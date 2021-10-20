import { useTable } from "react-table";
import React from "react";
import styled from "styled-components";

interface RepoTableProps {
  data: Array<Object>;
}

const Repotable = (props: RepoTableProps) => {
  const Styles: any = styled.div`
    table {
      border-spacing: 0;
      width: 100%;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }
    }
    max-height: calc(100vh - 30% - 80px);
    overflow: auto;
  `;
  const columns: any = React.useMemo(
    () => [
      {
        Header: "Repo Name",
        accessor: "name"
      },
      {
        Header: "Visibility",
        accessor: "visibility"
      },
      {
        Header: "Description",
        accessor: "description"
      }
    ],
    []
  );
  let data: any = props.data;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  }: any = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()} role="grid">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th role="row" {...column.getHeaderProps()} tabIndex={0}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td tabIndex={0} role="row" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default Repotable;
