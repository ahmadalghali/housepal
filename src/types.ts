export type LoginRequestDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  message: string;
  user?: UserDTO | null;
};

export type UserDTO = {
  id: number;
  email: string;
  firstname: string;
};

export type AddWorkEntryRequestDTO = {
  userId: number;
  dateOfWork: Date;
  minutesWorked: number;
  notes?: string;
};
export type AddWorkEntryResponseDTO = {
  message: string;
  workEntry: WorkEntryDTO;
};

export type WorkEntryDTO = {
  id: number;
  user: UserDTO;
  dateOfWork: string;
  minutesWorked: number;
  notes?: string;
};

export type MinutesWorkedStatsDataDTO = {
  user: UserDTO;
  minsWorkedToday: number;
  minsWorkedMonth: number;
  minsWorkedAllTime: number;
};

export type DashboardStats = { today: string; month: string; allTime: string };
