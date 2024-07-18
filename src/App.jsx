import React, { useState, useEffect } from 'react';
import { getAuthUrl } from './Spotify';

function App() {
  const [token, setToken] = useState(null);
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [deviceName, setDeviceName] = useState('');


  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsPlaying(data.is_playing);
          setDeviceName(data.device.name);
          setTrack(data.item.name);
        } else {
          setIsPlaying(false);
          setDeviceName('');
        }
      } catch (error) {
        console.error('Error fetching playback state:', error);
        setIsPlaying(false);
        setDeviceName('');
      }
    };

    if (token) {
      fetchPlaybackState();
    }
  }, [token]);

  const handlePlay = async () => {
    if (token && track) {
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const handlePause = async () => {
    if (token) {
      await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const handleSkip = async () => {
    if (token) {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const handleFetchTrack = async () => {
      window.location.href = getAuthUrl();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-8">My Music Player</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          {track ? (
            <>
              <h2 className="text-2xl">{track}</h2>
              <p>{track}</p>
            </>
          ) : (
            <p>No track selected</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePlay}
          >
            Play
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePause}
          >
            Pause
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSkip}
          >
            Skip
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFetchTrack}
          >
            Conectar Spotify
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-xl mb-2">Playback State</h3>
          <p><strong>Device:</strong> {deviceName}</p>
          <p><strong>Is Playing:</strong> {isPlaying ? 'Yes' : 'No'}</p>
          <p><strong>Track:</strong> {track ? track : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
