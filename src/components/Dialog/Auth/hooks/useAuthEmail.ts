import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TUserAuthEmailDtoRequest } from "../../../../api/entities/user/user.types";
import { userApiService } from "../../../../api/entities/user/user.api";
import { useContext, useState } from "react";
import { DialogContext } from "../../../Providers/DialogProvier/DialogProvider";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { useCookie } from "../../../../hooks/useCookie";

interface IAuthEmailForm {
  email: string;
  password?: string;
}

export const useAuthEmail = () => {
  const { setDialog } = useContext(DialogContext);
  const { setUser } = useContext(AuthContext);
  const { setCookie } = useCookie();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthEmailForm>({ mode: "onChange" });
  const [formData, setFormData] = useState<IAuthEmailForm | null>(null);
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (params: TUserAuthEmailDtoRequest) =>
      userApiService.postAuthEmail({ params }),
    onSuccess: (data) => {
      if (formData) {
        if (formData.password) {
          setCookie("accessToken", data?.accessToken);
          setCookie("refreshToken", data?.refreshToken);
          setCookie("exp", data?.exp);
        } else {
          setUser({ email: formData.email, isAuth: false });
          setDialog("AuthPassword", "Введите пароль из почты");
        }
      }
    },
  });

  const onSubmit = (data: IAuthEmailForm) => {
    setFormData(data);
    if (data.password) mutate({ email: data.email, password: data.password });
    else mutate({ email: data.email });
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
