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
  isLongRead: boolean;
  attachments?: TRecommendationAttachment[];
};
export type TRecommendationEditDtoRequest = {
  id: number;
  description: string;
  isLongRead: boolean;
  attachments?: File[];
  attachmentIds?: TRecommendationAttachment[];
  title: string;
};
