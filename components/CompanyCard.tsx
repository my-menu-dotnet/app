import { Company } from "@/types/api/Company";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { ReactNode } from "react";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <View className="flex-row gap-2 h-24 items-center px-2">
      <View className="w-16 h-16">
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={company.image.url}
          contentFit="cover"
          transition={100}
        />
      </View>
      <View className="h-full">
        <Text className="text-lg line-clamp-1">{company.name}</Text>

        <View className="gap-1">
          <View className="flex-row">
            {company.categories.map((category) => (
              <CategoryCard key={category.id}>{category.name}</CategoryCard>
            ))}
          </View>

          <View className="flex-row gap-1">
            <ContactCard>{company.email}</ContactCard>
            <ContactCard>{company.phone}</ContactCard>
          </View>
        </View>
      </View>
    </View>
  );
}

function ContactCard({ children }: { children: ReactNode }) {
  return (
    <View className="border border-gray-200 px-2 py-1 rounded max-w-36 flex-row gap-1 justify-center items-center">
      <Text className="line-clamp-1 text-gray-600 text-sm">{children}</Text>
    </View>
  );
}

function CategoryCard({ children }: { children: ReactNode }) {
  return (
    <View className="bg-gray-200 px-2 py-1 rounded-xl max-w-36 flex-row gap-1 justify-center items-center">
      <Text className="line-clamp-1 text-gray-600 text-sm">{children}</Text>
    </View>
  );
}
