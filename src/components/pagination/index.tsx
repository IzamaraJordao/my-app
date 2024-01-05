import React from 'react'
import { Form, Button } from 'react-bootstrap'

interface TablePaginationProps {
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (pageNumber: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
    }
  }

  return (
    <>
      <Form className="mb-3 px-3">
        <Form.Group controlId="pageSizeSelect" className="mb-2">
          <Form.Label>Tamanho da Página</Form.Label>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '69px',
            }}
          >
            <Form.Select
              style={{ width: '100%' }}
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value)
                onPageSizeChange(newSize)
                paginate(1)
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </Form.Select>
          </div>
        </Form.Group>
      </Form>
      <div style={{ width: '100%', paddingLeft: '1rem' }}>
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </>
  )
}

export default TablePagination
