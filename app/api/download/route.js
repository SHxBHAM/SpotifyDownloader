import { getAccessToken, getTrack } from "@/utils/spotify";

export async function POST(request) {
  const { link } = await request.json();

  const match = link.match(/https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
  if (!match) {
    return new Response(JSON.stringify({ error: "Invalid Spotify track link" }), { status: 400 });
  }

  const trackId = match[1];

  try {
    const token = await getAccessToken(
      process.env.SPOTIFY_CLIENTID,
      process.env.SPOTIFY_CLIENTSECRET
    );
    const track = await getTrack(trackId, token);

    const name = track.title; 
    const artist = track.artist || (track.artists && track.artists[0]?.name);

    console.log(`Track: ${name}`);
    console.log(`Artist: ${artist}`);

    return new Response(
      JSON.stringify({ message: "Track fetched", name, artist }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching track:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch track" }), {
      status: 500,
    });
  }
}
