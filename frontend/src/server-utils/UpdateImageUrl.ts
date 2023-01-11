import { getImageUploadUrl } from '../lib/backend';

export const updateImageUrl = async (
  extension: string = 'jpg',
  contentType: string
) => {
  const response = await getImageUploadUrl(extension, contentType);
  return response;
};
