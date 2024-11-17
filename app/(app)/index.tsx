import { CompanyCard } from "@/components/CompanyCard";
import { useUser } from "@/hooks/useUser";
import api from "@/services/api";
import { Company } from "@/types/api/Company";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUser();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const response = await api.get("/company");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <SafeAreaView>
      <Text>Bem vindo, {user.name.split(" ")[0]}</Text>
      {companies?.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </SafeAreaView>
  );
}
