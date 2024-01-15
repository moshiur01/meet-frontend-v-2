const upload_preset = import.meta.env.VITE_UPLOAD_PRESET_NAME;
const cloudinary_name = import.meta.env.VITE_CLOUDINARY_NAME;

const uploadImage = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloudinary", cloudinary_name);

  // console.log(upload_preset, cloudinary_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`,

    {
      method: "POST",
      body: uploadData,
    }
  );

  const data = await res.json();

  return data;
};

export default uploadImage;
