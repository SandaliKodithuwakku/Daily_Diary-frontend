import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDateOnly } from '../utils/formatDate';

const DiaryCard = ({ diary, onDelete }) => {
  const navigate = useNavigate();

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      Happy: '😊',
      Sad: '😢',
      Excited: '🤩',
      Angry: '😠',
      Calm: '😌',
      Anxious: '😰',
      Neutral: '😐',
    };
    return moodEmojis[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      Happy: 'bg-yellow-100 text-yellow-800',
      Sad: 'bg-blue-100 text-blue-800',
      Excited: 'bg-pink-100 text-pink-800',
      Angry: 'bg-red-100 text-red-800',
      Calm: 'bg-green-100 text-green-800',
      Anxious: 'bg-purple-100 text-purple-800',
      Neutral: 'bg-gray-100 text-gray-800',
    };
    return moodColors[mood] || 'bg-gray-100 text-gray-800';
  };

  const handleEdit = () => {
    navigate(`/edit-diary/${diary._id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this diary entry?')) {
      onDelete(diary._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{diary.title}</h3>
          <p className="text-sm text-gray-500">{getDateOnly(diary.date)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(diary.mood)}`}>
          {getMoodEmoji(diary.mood)} {diary.mood}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{diary.description}</p>

      <div className="flex space-x-3">
        <button
          onClick={handleEdit}
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;