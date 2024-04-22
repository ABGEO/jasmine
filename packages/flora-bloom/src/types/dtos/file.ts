type FileUpload = {
  file: File;
};

type FileOnResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  mimeType: string;
  key: string;
  size: number;
  eTag: string;
  originalName: string;
};

export type { FileUpload, FileOnResponse };
