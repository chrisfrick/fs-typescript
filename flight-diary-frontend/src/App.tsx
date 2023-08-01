import { useEffect, useState } from 'react';
import { getAllDiaries } from './diaryService';
import { NonSensitiveDiaryEntry } from './types';

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

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
    console.log('fetched diaries');
  }, []);

  return (
    <div>
      <h1>diary entries</h1>
      {diaries.map((diary) => (
        <DiaryEntry diaryEntry={diary} key={diary.id} />
      ))}
    </div>
  );
};

export default App;
