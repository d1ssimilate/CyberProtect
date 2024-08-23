import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TProjectsDtoRequest } from "../../../api/entities/projects/projects.types";
import { projectsApiService } from "../../../api/entities/projects/projects.api";
import { queryClient } from "../../../api/instance";

export interface IProjectsAddForm {
  description: string;
  title: string;
  link: string;
}

export const useProjectsAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProjectsDtoRequest>({ mode: "onChange" });

  const { mutate, isPending } = useMutation({
    mutationFn: (params: TProjectsDtoRequest) =>
      projectsApiService.postProjects({ params }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      reset();
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    reset,
    mutate,
  };
};
