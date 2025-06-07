import { log } from "console";
import { title } from "process";

export async function getAccessToken(clientId, clientSecret) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Spotify Auth Error:", data);
    throw new Error("Failed to retrieve access token from Spotify");
  }

  return data.access_token;
}


export async function getTrack(trackId,accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { 
            Authorization: `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return {
        title: data.name,
        artist: data.artists.map(artist => artist.name).join(', '),
    };
}