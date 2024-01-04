import React, { useState } from "react";
import "./styles.css";
import { Button, Form } from "react-bootstrap";
import { useTable } from "../../context/TableContext";

interface GroupingProps {
  columns: string[];
}

export const Grouping: React.FC<GroupingProps> = ({ columns }) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const { makeupData } = useTable();

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(event.target.value);
  };

  const handleGrouping = () => {
    if (selectedColumn) {
      const [selectedColumnName, selectedValue] = selectedColumn.split("-");
  
      // Filtra os dados com base na coluna e valor selecionados
      const groupedData = makeupData.filter((row) => row[selectedColumnName] === selectedValue);
  
      // Lógica para lidar com os dados agrupados
      // Exemplo: Pode atualizar o estado global ou fazer outras operações com os dados agrupados
      console.log("Dados agrupados:", groupedData);
  
      // Se desejar, você pode definir os dados agrupados em algum estado global
      // setGroupedData(groupedData);
    }
  };

  // Obtém os valores únicos para cada coluna
  const uniqueValues: string[] = columns
    .map((column) => makeupData.map((row) => row[column]))
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <td style={{ textAlign: "center", width: "100%" }}>
      <Form.Select
        onChange={handleColumnChange}
        value={selectedColumn || ""}
        style={{ width: "100%" }}
      >
        <option value="" disabled>
          Selecione uma opção de agrupamento
        </option>
        {columns.map((column) => (
          uniqueValues
            .map((uniqueValue, index) => (
              <option key={index} value={`${column}-${uniqueValue}`}>
                {`${column}: ${uniqueValue}`}
              </option>
            ))
        ))}
      </Form.Select>
      <Button onClick={handleGrouping} style={{ marginTop: "0.5rem" }}>
        Group
      </Button>
    </td>
  );
};
