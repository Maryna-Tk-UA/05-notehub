import type { DebouncedState } from 'use-debounce';
import css from './SearchBox.module.css'

interface SearchBoxProps {
  onSearch: DebouncedState<(value: string) => void>;
  value: string;
}

function SearchBox({ onSearch, value }: SearchBoxProps) {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {   
    onSearch(event.target.value)
   }
  
  return (
    <input
  className={css.input}
  type="text"
  placeholder="Search notes"
 defaultValue={value} 
 onChange={handleSearch}
 />
  )
}

export default SearchBox