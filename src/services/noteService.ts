import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const ACCESS_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string;

interface fetchNotesProps {
    page: number;
}

interface fetchNotesResponce {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes({ page }: fetchNotesProps) {
    const { data } = await axios.get<fetchNotesResponce>(`${BASE_URL}`, {
        params: {
            page,
            perPage: 12
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return data;
}


// export async function createNote() {
    // робить запит на створення нотатки та повертає створену нотатку у відповіді
// }


// export async function deleteNote() {
    // робить запит на видалення нотатки за id. Приймає id і повертає інфу про видалену нотатку 
// }