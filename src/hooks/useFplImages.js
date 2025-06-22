import { useEffect, useState } from 'react';

export function useFplImages() {
  const [map, setMap] = useState({});

  useEffect(() => {
    fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
      .then(res => res.json())
      .then(data => {
        const players = data.elements;
        const photos = {};
        players.forEach(p => {
          const fullName = `${p.first_name} ${p.second_name}`.toLowerCase();
          photos[fullName] = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${p.photo.replace('.jpg', '')}.png`;
        });
        setMap(photos);
      });
  }, []);

  return map;
}
