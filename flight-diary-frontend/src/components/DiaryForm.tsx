import axios from 'axios';
import { useState } from 'react';
import { createDiary } from '../diaryService';
import { toNewDiaryEntry } from '../utils';
import { NonSensitiveDiaryEntry } from '../types';

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryForm = ({
  setDiaries,
  setNotification,
  diaries,
}: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryObject = {
      date,
      visibility,
      weather,
      comment,
    };

    const newDiaryEntry = toNewDiaryEntry(diaryObject);

    createDiary(newDiaryEntry)
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
      <h2>add an entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility great{' '}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('great')}
          />
          good{' '}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('good')}
          />
          ok{' '}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('ok')}
          />
          poor{' '}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('poor')}
          />
        </div>
        <div>
          weather sunny{' '}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('sunny')}
          />
          rainy{' '}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('rainy')}
          />
          cloudy{' '}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('cloudy')}
          />
          stormy{' '}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('stormy')}
          />
          windy{' '}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('windy')}
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
    </div>
  );
};

export default DiaryForm;
