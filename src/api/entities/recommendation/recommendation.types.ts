export type TRecommendationAttachment = {
  id: number;
  label: string;
  type: string;
  url: string;
};
export type TRecommendationDtoRequest = {
  timezone: string;
};
export type TRecommendationRequestData = {
  description: string;
  id: number;
  title: string;
  attachments?: TRecommendationAttachment[];
};
// export type TRecommendationDtoRequest = {
//   title: string;
//   description: string;
//   attachments?: File[];
// };
export type TRecommendationEditDtoRequest = {
  id: number;
  description: string;
  attachments?: File[];
  title: string;
};
