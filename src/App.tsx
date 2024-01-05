import { Container, Spinner } from 'react-bootstrap'
import { useTable } from './context/TableContext'
import { TableComponent } from './components/table'

export function App() {
  const { makeupData, columns, selectedsColumns, handleToggleColumn, loading } =
    useTable()
  return (
    <Container className="d-flex flex-column">
      {!!selectedsColumns.length && (
        <TableComponent data={makeupData} columns={selectedsColumns} />
      )}
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'white',
            fontWeight: 'bold',
            gap: '0.5rem',
          }}
        >
          <Spinner
            style={{ width: '5rem', height: '5rem' }}
            animation="border"
            variant="info"
          />
          <p>carregando...</p>
        </div>
      ) : (
        <TableComponent
          data={makeupData}
          columns={columns}
          setColumn={handleToggleColumn}
        />
      )}
    </Container>
  )
}
