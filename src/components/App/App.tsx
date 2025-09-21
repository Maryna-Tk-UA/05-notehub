import { keepPreviousData, useQuery } from '@tanstack/react-query'
import css from './App.module.css'
import { fetchNotes } from '../../services/noteService'
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [curPage, setCurPage] = useState(0) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', curPage, searchValue],
    queryFn: () => fetchNotes({ page: curPage + 1, searchValue }), //це я передаю на бекенд запит. якщо натисну 3,то selected=2, отже curPage=2 і у запит пішло page = curPage + 1 = 3
    placeholderData: keepPreviousData,
  }) 

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value)
  }, 500)

  return (
    <div className={css.app}>
      <Toaster/>
	<header className={css.toolbar}>
		<SearchBox onSearch={handleSearch} value={searchValue}/>
    {isSuccess && data.totalPages > 1 && (
      <Pagination 
        totalPages={data.totalPages} 
        curPage={curPage} 
        onChange={setCurPage}/>
    )}
    <button 
      className={css.button}
      onClick={openModal}
    >
      Create note +
    </button>
  </header>
    {isLoading && <p>Loading notes...</p>}
    {isError && <p>Something went wrong...</p>}
    {data && <NoteList notes={data.notes}/>}
    {isModalOpen && 
      <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal} />  
      </Modal>}
</div>
  )
}

export default App