import { storage, logger } from '~~/utils/firebase';
import md5 from 'md5';

export class MediaRepository {
    _getFileName(file: { name: string }) {
        return `${md5(file.name + new Date().toISOString())}.${file.name.split('.').pop()}`;
    }

    async upload(files: Array<{ data: string, name: string, type: string, size: number }>): Promise<Array<string>> {
        logger.info('Uploading files...');

        const promises = files.map(async (file) => {
            const fileName = this._getFileName(file);

            logger.info(`Uploading file ${fileName}...`);

            const pathFile = `products/medias/${fileName}`;

            const imageBuffer = Buffer.from(file.data.split(',')[1], 'base64');

            logger.info('Uploading file to storage');

            await storage.bucket().file(pathFile).save(imageBuffer, {
                metadata: {
                    contentType: file.type,
                    cacheControl: 'public, max-age=31536000',
                    contentDisposition: `inline; filename="${fileName}"`
                }
            });

            logger.info(`File ${file.name} uploaded`, { path: pathFile });
            return pathFile;
        });

        return await Promise.all(promises);
    }
}