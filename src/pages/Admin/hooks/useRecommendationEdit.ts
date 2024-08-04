import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TRecommendationEditDtoRequest } from "../../../api/entities/recommendation/recommendation.types";
import { recommendationApiService } from "../../../api/entities/recommendation/recommendation.api";

export interface IRecommendationEditForm {
  description: string;
  title: string;
}

export const useRecommendationEdit = (
  defaultValues: IRecommendationEditForm
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecommendationEditForm>({ mode: "onChange", defaultValues });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (params: TRecommendationEditDtoRequest) =>
      recommendationApiService.putRecommendationRequest({ params }),
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    isSuccess,
    mutate,
  };
};
