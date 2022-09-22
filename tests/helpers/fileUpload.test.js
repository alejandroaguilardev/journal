import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dlt0oqtda",
    api_key: "715619761939736",
    api_secret: "gDbtyiYEA_QJjA_FUy6pMBzlpD0",
    secure: true,
})

describe('FileUpload', () => {

    test('debe de subir el archivo correctamente a clouddinary', async () => {

        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png";

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        const cloudResp = await cloudinary.api.delete_resources(['journal-app/' + imageId], {
            resource_type: 'image'
        });

        // console.log(cloudResp)


    });

    test('debe de retornar null', async () => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    });
})