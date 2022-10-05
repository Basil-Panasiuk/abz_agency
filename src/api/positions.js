import { BASE_URL } from '.';

export const loadPositions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/positions`);
    const data = await res.json();

    return data.positions;
  } catch (e) {
    alert('Failed to load list of positions');
  }
};
