import { IReport } from "./report";

export interface Member {
  id: number;
  userName: string;
  dateOfBirth: string;
  createdAt: string;
  lastActive: string;
  city: string;
  country: string;
  reports: IReport[];
}

