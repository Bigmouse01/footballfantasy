import { useEffect, useState } from 'react';

export function useFplImages() {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
      .then(res => res.json())
      .then(data => {
        const map = {};
        for (const player of data.elements) {
          const fullName = `${player.first_name} ${player.second_name}`.toLowerCase();
          const imageId = player.photo.split('.')[0];
          map[fullName] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imageId}.png`;
        }
        setImageMap(map);
      });
  }, []);

  return imageMap;
}