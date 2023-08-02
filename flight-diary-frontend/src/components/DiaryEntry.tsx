import { NonSensitiveDiaryEntry } from '../types';

interface DiaryEntryProps {
  diaryEntry: NonSensitiveDiaryEntry;
}

const DiaryEntry = ({ diaryEntry }: DiaryEntryProps) => {
  return (
    <div>
      <div>
        <b>{diaryEntry.date}</b>
      </div>
      <div>visibility: {diaryEntry.visibility}</div>
      <div>weather: {diaryEntry.weather}</div>
      <br></br>
    </div>
  );
};

export default DiaryEntry;
