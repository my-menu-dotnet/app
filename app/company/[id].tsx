import LocationDistance from "@/components/LocationDistance";
import { useLocation } from "@/hooks/useLocation";
import api from "@/services/api";
import { Menu } from "@/types/api/Menu";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import H1 from "@/components/text/H1";
import HStack from "@/components/flex/HStack";
import { useMemo } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import LactoseFree from "@/assets/icons/lactosefree.svg";
import GlutenFree from "@/assets/icons/glutenfree.svg";
import Vegan from "@/assets/icons/vegan.svg";
import Vegetarian from "@/assets/icons/vegetarian.svg";

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

    return menu.categories
      .map((category) => ({
        ...category,
        data: category.food,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [menu]);

  if (!menu) {
    return null;
  }

  return (
    <>
      <SafeAreaView className="bg-primary h-16">
        <Link href={"/"}>
          <Entypo name="chevron-left" size={28} color="white" />
        </Link>
      </SafeAreaView>
      <SectionList
        className="bg-primary pt-[60px]"
        contentContainerClassName="gap-2 bg-white min-h-full rounded-2xl px-4"
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row gap-1 max-h-[100px] w-full overflow-hidden">
            <Image
              style={{ width: 100, height: 100 }}
              source={
                item.image
                  ? item.image.url
                  : require("@/assets/default-food.jpg")
              }
            />
            <View className="flex-1">
              <View className="gap-1 flex-1">
                <Text className="text-md">{item.name}</Text>
                <View className="w-full flex-row items-around gap-1">
                  {item.lactoseFree && (
                    <View className="background-item flex-1 py-0 px-1">
                      <LactoseFree width={14} height={14} />
                      <Text className="text-xs line-clamp-1">Sem lactose</Text>
                    </View>
                  )}
                  {item.glutenFree && (
                    <View className="background-item flex-1 py-0 px-1">
                      <GlutenFree width={14} height={14} />
                      <Text className="text-xs line-clamp-1">Sem glúten</Text>
                    </View>
                  )}
                  {item.vegan && (
                    <View className="background-item flex-1 py-0 px-1">
                      <Vegan width={14} height={14} />
                      <Text className="text-xs line-clamp-1">Vegano</Text>
                    </View>
                  )}
                  {item.vegetarian && (
                    <View className="background-item flex-1 py-0 px-1">
                      <Vegetarian width={14} height={14} />
                      <Text className="text-xs line-clamp-1">Vegetariano</Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs text-gray-500 line-clamp-3">
                  {item.description}
                </Text>
              </View>

              <Text className="text-primary text-sm font-semibold">
                R$ {item.price}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="text-gray-400 font-semibold">{section.name}</Text>
        )}
        ListHeaderComponent={<Header menu={menu} />}
        ListFooterComponent={<View className="h-[80px]" />}
      />
    </>
  );
}

function Header({ menu }: { menu: Menu }) {
  const { location: userLocation } = useLocation();

  const copyToClipboard = (value: string) => {
    Clipboard.setStringAsync(value).then(() => {
      Toast.show({
        type: "success",
        text1: "Copiado para a área de transferência",
        text2: value,
      });
    });
  };

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

          {menu.company.categories.map((category, index) => {
            if (index > 2) return;
            return (
              <View
                key={category.id}
                className="bg-primary text-white px-2 py-1 rounded-md"
              >
                <Text className="text-white">{category.name}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className="gap-4 mt-2">
        <View>
          <View className="flex-row items-center gap-2 mb-2">
            <H1>Localização</H1>
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
          </View>
          <HStack className="gap-2">
            <Text className="text-sm">
              {menu.company.address.city} - {menu.company.address.zip_code},{" "}
              {menu.company.address.neighborhood}, {menu.company.address.street}
              , {menu.company.address.number}
            </Text>
          </HStack>
        </View>

        <View>
          <H1>Contato</H1>
          <HStack className="gap-2">
            {menu.company.email && (
              <Pressable
                onPress={() => copyToClipboard(menu.company.email)}
                className="background-item"
              >
                <Text className="text-sm">{menu.company.email}</Text>
              </Pressable>
            )}
            {menu.company.phone && (
              <Pressable
                onPress={() => copyToClipboard(menu.company.phone)}
                className="background-item"
              >
                <Text className="text-sm">{menu.company.phone}</Text>
              </Pressable>
            )}
          </HStack>
        </View>

        <View className="border-t border-gray-200 my-2" />
      </View>
    </>
  );
}
