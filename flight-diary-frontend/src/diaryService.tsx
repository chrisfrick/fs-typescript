import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const baseUrl = 'http://localhost:3003/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const createDiary = (newDiary: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, newDiary)
    .then((response) => response.data);
};
