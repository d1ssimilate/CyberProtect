import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TProjectRequestData } from "../../../api/entities/projects/projects.types";
import { projectsApiService } from "../../../api/entities/projects/projects.api";

export interface IProjectsAddForm {
  description: string;
  title: string;
  link: string;
}

export const useProjectEdit = (defaultValues: IProjectsAddForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectsAddForm>({ mode: "onChange", defaultValues });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (params: TProjectRequestData) =>
      projectsApiService.putProjects({ params }),
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    mutate,
    isSuccess,
  };
};
