import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import { useTable } from "./context/TableContext";
import { TableComponent } from "./components/table";

export function App() {
  const { makeupData, columns, selectedsColumns, handleToggleColumn } = useTable();
  return (
    <Container className="d-flex flex-column">
      {!!selectedsColumns.length && <TableComponent data={makeupData} columns={selectedsColumns} />}
      <TableComponent data={makeupData} columns={columns} setColumn={handleToggleColumn} />
    </Container>
  );
}
