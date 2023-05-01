import { AddWorkEntryRequestDTO, AddWorkEntryResponseDTO } from "./../types";
import { api } from "./api";

async function submitWorkEntry(addWorkEntryRequestDTO: AddWorkEntryRequestDTO) {
  return api.post<AddWorkEntryResponseDTO>("/entries", addWorkEntryRequestDTO).then((res) => res.data);
}

async function deleteEntry(id: number): Promise<boolean> {
  return api.delete(`/entries/${id}`).then((res) => res.status == 200 || res.status == 204);
}

export { submitWorkEntry, deleteEntry };
