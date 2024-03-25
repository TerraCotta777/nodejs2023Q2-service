import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';

export class Favorites {
  favoriteId: string;
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
