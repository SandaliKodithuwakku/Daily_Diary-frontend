import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DiaryCard from '../components/DiaryCard';
import { getAllDiaries, deleteDiary } from '../services/api';

const Dashboard = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await getAllDiaries();
      setDiaries(response.data.diaries);
    } catch (err) {
      setError('Failed to fetch diaries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiary(id);
      setDiaries(diaries.filter((diary) => diary._id !== id));
      alert('Diary deleted successfully!');
    } catch (err) {
      alert('Failed to delete diary');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Diary Entries</h1>
            <p className="text-white text-opacity-90">
              You have {diaries.length} {diaries.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <button
            onClick={() => navigate('/add-diary')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg"
          >
            ➕ Add New Entry
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {diaries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No diary entries yet</h2>
            <p className="text-gray-600 mb-6">Start writing your thoughts and memories!</p>
            <button
              onClick={() => navigate('/add-diary')}
              className="btn-primary px-6 py-3"
            >
              Create Your First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diaries.map((diary) => (
              <DiaryCard key={diary._id} diary={diary} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;