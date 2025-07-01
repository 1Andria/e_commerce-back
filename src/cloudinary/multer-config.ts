import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({}),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
};
