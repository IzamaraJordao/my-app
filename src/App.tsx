import { Container } from "react-bootstrap";
import { useTable } from "./context/TableContext";
import { TableComponent } from "./components/table";

export function App() {
  const { makeupData, columns } = useTable();
  return (
    <Container>
      <TableComponent data={makeupData} columns={columns} />
    </Container>
  );
}
