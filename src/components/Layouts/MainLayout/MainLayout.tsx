import { ReactNode, useEffect } from "react";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { useMutation } from "@tanstack/react-query";
import { clicksApiService } from "../../../api/entities/clicks/clicks.api";
import { queryClient } from "../../../api/instance";

export function MainLayout({ children }: { children: ReactNode }) {
  const { mutate } = useMutation({
    mutationFn: () => clicksApiService.postClick(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clicks"] });
    },
  });
  useEffect(() => mutate(), []);
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
