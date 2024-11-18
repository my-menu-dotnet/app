import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationContextProps = {
  geocode: Location.LocationGeocodedAddress | null;
  location: Location.LocationObject | undefined;
};

const LocationContext = createContext<LocationContextProps>(
  {} as LocationContextProps
);

export function useLocation() {
  const value = useContext(LocationContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

type LocationProviderProps = {
  children: React.ReactNode;
};

export function LocationProvider({ children }: LocationProviderProps) {
  const [geocode, setGeocode] = useState<Location.LocationGeocodedAddress | null>(null);
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setGeocode(reverseGeocode[0]);
      setLocation(location);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ geocode, location }}>
      {children}
    </LocationContext.Provider>
  );
}
