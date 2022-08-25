import { storage } from '@services/firebase';

export const str = {
  in(path: string) {
    const ref = storage.ref(storage.storage, path);
    return {
      async add(image: string) {
        return storage.uploadString(ref, image, 'data_url');
      },
      async get(callback?: (data: { url: string; path: string }) => void) {
        return storage.listAll(ref).then((res) => {
          return res.items.map(async (item) => {
            return storage.getBlob(item).then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64data = reader.result;
                return (
                  callback &&
                  callback({ url: base64data as string, path: item.fullPath })
                );
              };
              return reader.result;
            });
          });
        });
      },
    };
  },
};
