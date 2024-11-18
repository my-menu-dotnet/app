import { Category } from "@/types/api/Category";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <View className="w-28 justify-center items-center overflow-hidden bg-primary rounded-md py-2">
      <View className="right-[-25%]">
        <Image
          style={{ width: 100, height: 80 }}
          source={category.image.url}
          contentFit="contain"
          transition={100}
        />
      </View>
      <Text className="text-sm text-white font-bold">{category.name}</Text>
    </View>
  );
}
