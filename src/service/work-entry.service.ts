import { AddWorkEntryRequestDTO, AddWorkEntryResponseDTO, MinutesWorkedStatsDataDTO, WorkEntryDTO } from "./../types";
import { api } from "./api";

async function submitWorkEntry(addWorkEntryRequestDTO: AddWorkEntryRequestDTO) {
  return api.post<AddWorkEntryResponseDTO>("/entries", addWorkEntryRequestDTO).then((res) => res.data);
}

async function deleteEntry(id: number): Promise<boolean> {
  return api.delete(`/entries/${id}`).then((res) => res.status == 200 || res.status == 204);
}

async function getRecentEntries(): Promise<WorkEntryDTO[]> {
  return api.get<WorkEntryDTO[]>(`/entries?limit=15`).then((res) => res.data);
}

async function getAllEntries(): Promise<WorkEntryDTO[]> {
  return api.get<WorkEntryDTO[]>(`/entries`).then((res) => res.data);
}

async function getEntriesByUserId(userId: number): Promise<WorkEntryDTO[]> {
  return api.get<WorkEntryDTO[]>(`/entries/users/${userId}`).then((res) => res.data);
}

async function getMyEntries(userId: number): Promise<WorkEntryDTO[]> {
  return api.get<WorkEntryDTO[]>(`/entries/users/${userId}`).then((res) => res.data);
}

async function getUserStats(userId: number): Promise<MinutesWorkedStatsDataDTO> {
  return api.get(`/entries/stats/users/${userId}`).then((res) => res.data);
}

async function getAllUsersStats(): Promise<MinutesWorkedStatsDataDTO[]> {
  return api.get(`/entries/stats`).then((res) => res.data);
}

export {
  submitWorkEntry,
  deleteEntry,
  getRecentEntries,
  getUserStats,
  getAllUsersStats,
  getMyEntries,
  getAllEntries,
  getEntriesByUserId,
};
