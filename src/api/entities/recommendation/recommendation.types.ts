export type TRecommendationRequestData = {
  description: string;
  id: number;
  title: string;
  attachments?: [{ id: number; label: number; type: string; url: string }];
};
export type TRecommendationDtoRequest = {
  title: string;
  description: string;
  attachments?: File[];
};
