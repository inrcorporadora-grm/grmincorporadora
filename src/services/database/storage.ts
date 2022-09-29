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
      async del(all?: boolean) {
        if (all) {
          await Promise.all(
            (
              await storage.listAll(ref)
            ).prefixes.map(async (childRef) => {
              await Promise.all(
                (
                  await storage.listAll(childRef)
                ).items.map(async (child) => {
                  await storage.deleteObject(child);
                  return child;
                }),
              );
              return childRef;
            }),
          );
          await Promise.all(
            (
              await storage.listAll(ref)
            ).items.map(async (child) => {
              await storage.deleteObject(child);
              return child;
            }),
          );
        }
        return storage.deleteObject(ref);
      },
    };
  },
  async download(item: StorageReference) {
    return storage.getDownloadURL(item);
  },
};
