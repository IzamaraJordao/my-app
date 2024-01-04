import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { MakeupDataProps } from "../../types";
import TablePagination from "../pagination";
import { TableFilter } from "../filter";
import { limitCharacter } from "../../helpers/limitCharacter";

interface TableComponentProps {
  data: any[];
  columns: string[];
  defaultPageSize?: number;
  setColumn?: any;
}

export function TableComponent({
  data,
  columns,
  defaultPageSize,
  setColumn
}: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize || 10);
  const [filter, setFilter] = useState<{ [key: string]: string }>({});
  const [sortOrder, setSortOrder] = useState<{ order: "asc" | "desc"; column: string }>();

console.log("sortOrder", sortOrder)


  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filter).every(([column, value]) =>
        String(row[column]).toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [data, filter]);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
  
    let sortedData = [...filteredData];
  
    if (sortOrder) {
      sortedData = filteredData.sort((a: any, b: any) => {
        if (a[sortOrder.column] < b[sortOrder.column]) {
          return sortOrder.order === 'asc' ? -1 : 1;
        }
        if (a[sortOrder.column] > b[sortOrder.column]) {
          return sortOrder.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  
    const paginatedData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  
    return paginatedData;
  }, [filteredData, sortOrder, currentPage, pageSize]);

  console.log(currentItems)
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilter({ ...filter, [column]: value });
  };

  

  return (
    <div>
      <Table className="table table-bordered" >
        <thead>
          <tr>
            <TableFilter
              columns={columns}
              onFilterChange={handleFilterChange} 
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
              setColumn={setColumn}
            />
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    minWidth: "100px",
                  }}
                >
                  {renderCellContent(row[column], column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      
        <TablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredData.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
     
    </div>
  );
}

function renderProductColors(product: MakeupDataProps["product_colors"]) {
  if (!product || !Array.isArray(product)) {
    return "N/A";
  }
  return product.map((color, index) => (
    <div key={index}>
      {color.hex_value || "N/A"}-{color.colour_name}
    </div>
  ));
}
function renderCellContent(value: string, column: string) {
  const limitTextColumns = [
    "image_link",
    "product_link",
    "website_link",
    "product_api_url",
    "api_featured_image",
  ];

  const shouldLimit = limitTextColumns.includes(column);

  return shouldLimit ? (
    <a href={value}>{limitCharacter(value)}</a>
  ) : typeof value === "string" || typeof value === "number" ? (
    value
  ) : (
    renderSpecialColumns(value, column) || "N/A"
  );
}

function renderSpecialColumns(
  value: MakeupDataProps["product_colors"],
  column: string
) {
  switch (column) {
    case "product_colors":
      return renderProductColors(value);
    default:
      return null;
  }
}
