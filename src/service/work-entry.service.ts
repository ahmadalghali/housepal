import { AddWorkEntryRequestDTO, AddWorkEntryResponseDTO } from "./../types";
import { api } from "./api";

async function submitWorkEntry(addWorkEntryRequestDTO: AddWorkEntryRequestDTO) {
  return api.post<AddWorkEntryResponseDTO>("/entries", addWorkEntryRequestDTO).then((res) => res.data);
}

export { submitWorkEntry };
