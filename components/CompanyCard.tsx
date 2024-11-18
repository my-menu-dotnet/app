import { Company } from "@/types/api/Company";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { Link } from "expo-router";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.id}`}>
      <View className="flex-row gap-2 h-24 items-center">
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
    </Link>
  );
}

function ContactCard({ children }: { children: ReactNode }) {
  return (
    <View className="border border-gray-200 px-2 py-1 rounded max-w-36 flex-row gap-1 justify-center items-center">
      <Text className="line-clamp-1 text-gray-600 text-xs">{children}</Text>
    </View>
  );
}

function CategoryCard({ children }: { children: ReactNode }) {
  return (
    <View className="relative max-w-36 py-1 px-2 flex-row gap-1 justify-center items-center">
      <View className="absolute left-0 right-0 top-0 bottom-0 bg-primary rounded-full opacity-85" />
      <Text className="line-clamp-1 text-sm text-white font-bold">
        {children}
      </Text>
    </View>
  );
}
