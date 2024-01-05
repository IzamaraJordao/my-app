import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react'
import { MakeupDataProps } from '../types'
import axios from 'axios'

interface TableContextProps {
  children: ReactNode
}

interface TableContextType {
  columns: string[]
  makeupData: MakeupDataProps[]
  selectedsColumns: string[]
  handleToggleColumn: any
  loading: boolean
}

export const TableContext = createContext({} as TableContextType)

export function TableProvider({ children }: TableContextProps) {
  const [makeupData, setMakeupData] = useState<MakeupDataProps[]>([])
  const [selectedsColumns, setSelectedsColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get<MakeupDataProps[]>(
          'https://makeup-api.herokuapp.com/api/v1/products.json',
        )
        setMakeupData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const columns = [
    'id',
    'name',
    'brand',
    'price',
    'price_sign',
    'currency',
    'image_link',
    'product_link',
    'website_link',
    'description',
    'rating',
    'category',
    'product_type',
    'tag_list',
    'created_at',
    'updated_at',
    'product_api_url',
    'api_featured_image',
    'product_colors',
  ]

  const handleToggleColumn = (column: string) => {
    let selecteds = [...selectedsColumns]
    if (selecteds) {
      const index = selecteds.findIndex(
        (selectedColumn) => selectedColumn === column,
      )
      index !== -1 ? selecteds.splice(index, 1) : selecteds.push(column)
      setSelectedsColumns(selecteds)
    }
  }

  return (
    <TableContext.Provider
      value={{
        loading,
        makeupData,
        columns,
        selectedsColumns,
        handleToggleColumn,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTable = () => useContext(TableContext)
