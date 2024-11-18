import { CompanyCard } from "@/components/CompanyCard";
import api from "@/services/api";
import { Company } from "@/types/api/Company";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Input from "@/components/form/Input";
import { Category } from "@/types/api/Category";
import { CategoryCard } from "@/components/CategoryCard";
import { useLocation } from "@/hooks/useLocation";

export default function Index() {
  const { geocode } = useLocation();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const response = await api.get("/company");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const response = await api.get("/category");
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  cssInterop(EvilIcons, {
    className: {
      target: "style",
      nativeStyleToProp: {
        fill: "color",
      },
    },
  });

  cssInterop(MaterialCommunityIcons, {
    className: {
      target: "style",
      nativeStyleToProp: {
        fill: "color",
      },
    },
  });

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 8 }}
        data={companies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(category) => category.id}
        renderItem={({ item }) => <CompanyCard company={item} />}
        ListHeaderComponentClassName="gap-4"
        ListHeaderComponent={
          <>
            <View className="w-full justify-between items-center flex-row">
              <View className="gap-1">
                <Text className="text-xs text-gray-400">Sua localizção</Text>
                <View className="flex-row items-center">
                  <EvilIcons
                    className="text-primary ml-[-6px]"
                    name="location"
                    size={26}
                  />
                  <Text className="text-md">
                    {geocode?.city} - {geocode?.street}
                  </Text>
                </View>
              </View>

              <View className="relative">
                <FontAwesome name="bell-o" size={18} color="black" />
                <View className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
              </View>
            </View>

            {/* <View>
            <Text className="text-lg font-semibold">Olá, {user.name}!</Text>
            <Text className="text-sm text-gray-400">
              Conheça as melhores empresas próximas a você
            </Text>
          </View> */}

            <Input
              placeholder="Encontre os melhores produtos e negócios"
              leftIcon={
                <MaterialCommunityIcons
                  className="text-gray-400"
                  name="magnify"
                  size={24}
                />
              }
            />

            <View className="w-full h-44 rounded-md bg-gray-300"></View>

            <View className="gap-4">
              <Text className="font-semibold">Categorias</Text>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                keyExtractor={(category) => category.id}
                renderItem={({ item }) => <CategoryCard category={item} />}
              />
            </View>

            <Text className="font-semibold mb-4">Empresas próximas</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
