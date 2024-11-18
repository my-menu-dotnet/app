import LocationDistance from "@/components/LocationDistance";
import { useLocation } from "@/hooks/useLocation";
import api from "@/services/api";
import { Menu } from "@/types/api/Menu";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import H1 from "@/components/text/H1";
import HStack from "@/components/flex/HStack";
import { useMemo } from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function Page() {
  const localParams = useLocalSearchParams();
  const id = localParams.id as string;

  const { data: menu } = useQuery({
    queryKey: ["company", id],
    queryFn: async (): Promise<Menu> => {
      const response = await api.get(`/menu/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const sections = useMemo(() => {
    if (!menu) {
      return [];
    }

    return menu.categories.map((category) => ({
      ...category,
      data: category.food,
    }));
  }, [menu]);

  if (!menu) {
    return null;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Link href={"/"}>
        <Entypo name="chevron-left" size={24} color="white" />
      </Link>
      <SectionList
        contentContainerClassName="h-full bg-white mt-16 rounded-2xl px-4"
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 border border-gray-300 rounded-md py-1 px-1 justify-center items-center">
            <Text className="text-sm">{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="text-gray-400 font-semibold">{section.name}</Text>
        )}
        ListHeaderComponent={<Header menu={menu} />}
      />
    </SafeAreaView>
  );
}

function Header({ menu }: { menu: Menu }) {
  const { location: userLocation } = useLocation();

  return (
    <>
      <View className="items-center">
        <View className="bg-white px-4 py-2 rounded-md border border-gray-300 mt-[-55px] justify-center items-center gap-2">
          <Image
            style={{ width: 70, height: 70 }}
            source={menu.company.image.url}
            contentFit="contain"
            transition={100}
          />
          <H1>{menu.company.name}</H1>

          {menu.company.categories.map((category) => (
            <View key={category.id} className="bg-primary text-white px-2 py-1 rounded-md">
              <Text className="text-white">{category.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-4">
        <View>
          <H1>Localização</H1>
          <HStack className="gap-2">
            <Text className="text-sm">
              {menu.company.address.city} - {menu.company.address.zip_code},{" "}
              {menu.company.address.neighborhood}, {menu.company.address.street}
              , {menu.company.address.number}
            </Text>
            {userLocation && (
              <HStack className="bg-gray-100 border border-gray-300 rounded-md py-1 px-1 justify-center items-center">
                <EvilIcons name="location" size={16} color="black" />
                <Text className="text-sm">
                  <LocationDistance
                    lat1={userLocation.coords.latitude}
                    lon1={userLocation.coords.longitude}
                    lat2={menu.company.address.latitude}
                    lon2={menu.company.address.longitude}
                  />
                </Text>
              </HStack>
            )}
          </HStack>
        </View>

        <View>
          <H1>Contato</H1>
          <HStack className="gap-2">
            <View className="bg-gray-100 border border-gray-300 rounded-md py-1 px-1 justify-center items-center">
              <Text className="text-sm">{menu.company.email}</Text>
            </View>
            <View className="bg-gray-100 border border-gray-300 rounded-md py-1 px-1 justify-center items-center">
              <Text className="text-sm">{menu.company.phone}</Text>
            </View>
          </HStack>
        </View>

        <H1>Cardapio</H1>
      </View>
    </>
  );
}
