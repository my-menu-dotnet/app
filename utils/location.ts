
function calculateDistanceBetweenTwoPointsInKm(
  point1: { lat: number; long: number },
  point2: { lat: number; long: number }
): number {
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
  const dLon = (point2.long - point1.long) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(point1.lat * (Math.PI / 180)) *
      Math.cos(point2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c;

  return distancia;
}

export default {
  calculateDistanceBetweenTwoPointsInKm,
}
