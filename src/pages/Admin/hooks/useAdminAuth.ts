import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TAdminAuthDtoRequest } from "../../../api/entities/admin/admin.types";
import { adminApiService } from "../../../api/entities/admin/admin.api";

interface IAdminAuthForm {
  login: string;
  password: string;
}

export const useAdminAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdminAuthForm>({ mode: "onChange" });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (params: TAdminAuthDtoRequest) =>
      adminApiService.postAdminAuth({ params }),
  });

  const onSubmit = (data: IAdminAuthForm) => {
    mutate({ login: data.login, password: data.password });
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    isSuccess,
  };
};
