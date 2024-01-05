import { FormControl } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'

interface SearchPropsFilter {
  handleFilterChange: (column: string, value: string) => void
  column: string
}
export function Search({ handleFilterChange, column }: SearchPropsFilter) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        background: '#ffffff',
        borderRadius: '0.5rem',
        transition: 'all 0.3s ease',
        outline: 'none',
      }}
    >
      <FormControl
        style={{
          border: 'none',
          outline: 'none',
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}
        className="form-control outline-0"
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => handleFilterChange(column, e.target.value)}
      />
      <FiSearch size={15} color={'#000'} style={{ marginRight: '0.5rem' }} />
    </div>
  )
}
