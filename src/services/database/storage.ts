import { storage } from '@services/firebase';

export const str = {
  in(path: string) {
    const ref = storage.ref(storage.storage, path);
    return {
      async add(image: string) {
        return storage.uploadString(ref, image, 'data_url');
      },
      async get() {
        const images: { path: string; url: string }[] = [];
        storage.listAll(ref).then((res) => {
          res.items.forEach((item) => {
            storage.getDownloadURL(item).then((url) => {
              images.push({ path: item.fullPath, url });
            });
          });
        });
        return images;
      },
    };
  },
};
