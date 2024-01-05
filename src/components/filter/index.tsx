import React, { Fragment, useEffect, useState } from 'react'
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md'
import './styles.scss'
import { translateColumn } from '../../helpers/translation'
import { Search } from '../search'
interface TableFilterProps {
  columns: string[]
  onFilterChange: (column: string, value: string) => void
  setSortOrder: React.Dispatch<
    React.SetStateAction<
      | {
          order: 'asc' | 'desc'
          column: string
        }
      | undefined
    >
  >
  sortOrder:
    | {
        order: 'asc' | 'desc'
        column: string
      }
    | undefined
  setColumn?: any
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  onFilterChange,
  setSortOrder,
  sortOrder,
  setColumn,
}) => {
  const [activeColumn, setActiveColumn] = useState<string | null>(null)
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: string }>(
    {},
  )

  function pressColumnSearch(column: string) {
    setActiveColumn(column === activeColumn ? null : column)
  }

  function toggleSortOrder(column: string) {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder?.column === column) {
        return {
          order: prevSortOrder.order === 'asc' ? 'desc' : 'asc',
          column,
        }
      }

      return {
        order: 'asc',
        column,
      }
    })
  }

  function handleFilterChange(column: string, value: string) {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [column]: value,
    }))
    onFilterChange(column, value)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveColumn(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeColumn])

  return (
    <>
      {columns.map((column, index) => (
        <Fragment key={index}>
          {activeColumn === column ? (
            <th style={{ background: '#7f56d9' }}>
              <Search handleFilterChange={handleFilterChange} column={column} />
            </th>
          ) : (
            <th
              className="containerThead"
              onDoubleClick={() => {
                setColumn(column)
              }}
              style={{ width: '200px', cursor: 'pointer' }}
            >
              <div className="form">
                <p
                  onClick={() => {
                    pressColumnSearch(column)
                  }}
                >
                  {translateColumn(column)}
                </p>
                <button
                  onClick={() => toggleSortOrder(column)}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  {column === sortOrder?.column &&
                  sortOrder?.order === 'asc' ? (
                    <MdKeyboardDoubleArrowUp fontSize={'1.3rem'} />
                  ) : (
                    <MdKeyboardDoubleArrowDown fontSize={'1.3rem'} />
                  )}
                </button>
              </div>
            </th>
          )}
        </Fragment>
      ))}
    </>
  )
}

export { TableFilter }
