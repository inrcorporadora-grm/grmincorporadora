import type { StorageReference } from 'firebase/storage';
import { storage } from '@services/firebase';

export const str = {
  in(path: string) {
    const ref = storage.ref(storage.storage, path);
    return {
      async add(image: string) {
        return storage.uploadString(ref, image, 'data_url');
      },
      async get() {
        return storage.listAll(ref).then((res) => {
          return res.items.map((item) => {
            return {
              path: item.fullPath,
              img: item,
            };
          });
        });
      },
      async del() {
        return storage.deleteObject(ref);
      },
    };
  },
  async download(item: StorageReference) {
    return storage.getDownloadURL(item);
  },
};
