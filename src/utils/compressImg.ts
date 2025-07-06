// Fungsi kompres gambar
export const compressImage = (
  file: File,
  maxWidth: number,
  quality: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Gambar ulang dengan kualitas lebih rendah
        ctx?.drawImage(img, 0, 0, width, height);

        // Konversi ke base64 dengan kualitas terkompresi
        const compressedData = canvas.toDataURL("image/jpeg", quality);
        // const base64WithoutMetadata = compressedData.split(",")[1];
        // resolve(base64WithoutMetadata);
        resolve(compressedData);
      };
    };

    reader.onerror = (error) => reject(error);
  });
};

