import location from "@/utils/location";
import { useMemo } from "react";
import { Text } from "react-native";

type LocationDistanceProps = {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
};

export default function LocationDistance({
  lat1,
  lon1,
  lat2,
  lon2,
}: LocationDistanceProps) {
  const distance = useMemo(() => {
    const distance = location.calculateDistanceBetweenTwoPointsInKm(
      {
        lat: lat1,
        long: lon1,
      },
      {
        lat: lat2,
        long: lon2,
      }
    );

    if (distance >= 1) {
      return `${Math.round(distance)} km`;
    }

    return `${Math.round(distance * 1000)} m`;
  }, [lat1, lat2, lon1, lon2]);

  return distance;
}
