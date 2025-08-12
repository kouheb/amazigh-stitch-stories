// Utility to generate a square thumbnail (center-cropped) from an image File
// Returns a Blob of type image/webp
export async function generateSquareThumbnail(file: File, size = 400): Promise<Blob> {
  const image = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Determine crop area to make a square
  const minSide = Math.min(image.width, image.height);
  const sx = (image.width - minSide) / 2;
  const sy = (image.height - minSide) / 2;

  canvas.width = size;
  canvas.height = size;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, sx, sy, minSide, minSide, 0, 0, size, size);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create thumbnail'));
    }, 'image/webp', 0.9);
  });
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
