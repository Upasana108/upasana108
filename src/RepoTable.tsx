import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce
} from "react-table";
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Owner",
        accessor: "owner.login",
        Cell: (tableprops) => {
          console.log("tableprops** ", tableprops);
          console.log("tableprops.data** ", tableprops.data);
          console.log("tableprops.data.owner** ", tableprops.data[0].owner);
          return (
            <div style={{ display: "flex" }}>
              {tableprops && tableprops.data && tableprops.data[0].owner && (
                <>
                  <img
                    src={tableprops.data[0].owner.avatar_url}
                    alt="avatar"
                    width="20px"
                    height="20px"
                    style={{ marginRight: "5px" }}
                  />
                  <span>{tableprops.data[0].owner.login}</span>
                </>
              )}
            </div>
          );
        }
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Description",
        accessor: "description"
      },
      {
        Header: "Stars",
        accessor: "stargazers_count"
      },
      {
        Header: "Open Issue Count",
        accessor: "open_issues_count"
      },
      {
        Header: "Watchers",
        accessor: "watchers_count"
      }
    ],
    []
  );
  let data: any = props.data;

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }) {
    // const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          // placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0"
          }}
        />
      </span>
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  }: any = useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()} role="grid">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  role="row"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  tabIndex={0}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}

                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
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
