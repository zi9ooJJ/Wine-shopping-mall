import { authClient } from "../httpClient";

interface UploadImageArgs {
  formData: FormData;
  title: string;
}

// TODO: 이미지 업로드 재조사필요
export async function uploadImage({ formData, title }: UploadImageArgs) {
  try {
    formData.append("title", title);
    await authClient.post("/upload", {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {}
}
