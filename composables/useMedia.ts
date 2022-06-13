import imageCompression from "browser-image-compression";

const compressFile = async (file): Promise<File | Blob> => {
    console.log(file.size / 1024 / 1024);

    const options = {
        useWebWorker: true,
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
    };

    const fileCompressed = await imageCompression(file, options);

    console.log(fileCompressed.size / 1024 / 1024);

    return fileCompressed
};

export const useMedia = () => {
    const compressImage = async (file: File): Promise<File | Blob> => {
        return await compressFile(file);
    }

    return {
        compressImage
    }
}