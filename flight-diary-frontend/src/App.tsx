import { useEffect, useState } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './diaryService';

import axios from 'axios';

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
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    createDiary(newDiaryEntry as NewDiaryEntry)
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          setNotification(error.response.data);
          setTimeout(() => setNotification(null), 5000);
        }
      });
  };

  return (
    <div>
      <div style={{ color: 'red' }}>{notification}</div>
      <h2>add an entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

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
