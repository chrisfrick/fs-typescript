import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import { getAllDiaries } from './diaryService';

import DiaryEntry from './components/DiaryEntry';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <div style={{ color: 'red' }}>{notification}</div>

      <DiaryForm
        diaries={diaries}
        setDiaries={setDiaries}
        setNotification={setNotification}
      />

      <div>
        <h2>diary entries</h2>
        {diaries.map((diary) => (
          <DiaryEntry diaryEntry={diary} key={diary.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
