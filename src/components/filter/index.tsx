import React, { Fragment, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { Grouping } from "../grouping";

interface TableFilterProps {
  columns: string[];
  onFilterChange: (column: string, value: string) => void;
  setSortOrder: React.Dispatch<
    React.SetStateAction<
      | {
          order: "asc" | "desc";
          column: string;
        }
      | undefined
    >
  >;
  sortOrder:
    | {
        order: "asc" | "desc";
        column: string;
      }
    | undefined;
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  onFilterChange,
  setSortOrder,
  sortOrder,
}) => {
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: string }>(
    {}
  );

  function pressColumnSearch(column: string) {
    setActiveColumn(column === activeColumn ? null : column);
  }

  function toggleSortOrder(column: string) {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder?.column === column) {
        return {
          order: prevSortOrder.order === "asc" ? "desc" : "asc",
          column,
        };
      }

      return {
        order: "asc",
        column,
      };
    });
  }

  function handleFilterChange(column: string, value: string) {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [column]: value,
    }));
    onFilterChange(column, value);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveColumn(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeColumn]);

  return (
    <>
      {columns.map((column, index) => (
        <Fragment key={index}>
          {activeColumn === column ? (
            <FormControl
              type="text"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0px",
              }}
              placeholder={column}
              onChange={(e) => handleFilterChange(column, e.target.value)}
            />
          ) : (
            <th style={{ width: "200px", cursor: "pointer" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={() => {
                    pressColumnSearch(column);
                  }}
                >
                  {column}
                </p>
                <button
                  onClick={() => toggleSortOrder(column)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: "transparent",
                    textAlign: "center",
                  }}
                >
                  {column === sortOrder?.column &&
                  sortOrder?.order === "asc" ? (
                    <BsArrowUp fontSize={"1.3rem"} />
                  ) : (
                    <BsArrowDown fontSize={"1.3rem"} />
                  )}
                </button>
              </div>
            </th>
          )}
          <Grouping columns={columns} />
        </Fragment>
      ))}
    </>
  );
};

export { TableFilter };
