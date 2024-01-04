import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { MakeupDataProps } from "../types";
import axios from "axios";

interface TableContextProps {
  children: ReactNode;
}

interface TableContextType {
  columns: string[];
  makeupData: MakeupDataProps[];
}

export const TableContext = createContext({} as TableContextType);

export function TableProvider({ children }: TableContextProps) {
  const [makeupData, setMakeupData] = useState<MakeupDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MakeupDataProps[]>(
          "https://makeup-api.herokuapp.com/api/v1/products.json"
        );
        setMakeupData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    "id",
    "name",
    "brand",
    "price",
    "price_sign",
    "currency",
    "image_link",
    "product_link",
    "website_link",
    "description",
    "rating",
    "category",
    "product_type",
    "tag_list",
    "created_at",
    "updated_at",
    "product_api_url",
    "api_featured_image",
    "product_colors",
  ];
  return (
    <TableContext.Provider
      value={{
        makeupData,
        columns,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => useContext(TableContext);