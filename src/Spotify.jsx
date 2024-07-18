const clientId = 'a38d284fac7246debb6683f8b5254916';
const clientSecret = 'aa23d78e25004bf8a255248761bbd7c5';
const redirectUri = 'http://localhost:5173/callback'; // Certifique-se de adicionar este URI de redirecionamento nas configurações do seu app no Spotify Developer Dashboard

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

export const getAuthUrl = () => {
  const url = new URL('https://accounts.spotify.com/authorize');
  url.searchParams.append('client_id', clientId);
  url.searchParams.append('response_type', 'token');
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('scope', scopes.join(' '));
  return url.toString();
};

export const fetchAccessToken = async (code) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

export const fetchTrack = async (token, trackId) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
