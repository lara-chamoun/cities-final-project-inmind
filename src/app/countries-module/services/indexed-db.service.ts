import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'myDatabase';
  private formDataObjectStoreName = 'formDataObjectStore';
  private imageObjectStoreName = 'imageObjectStore';

  openDb(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        console.log('Creating or upgrading object stores...');
        db.createObjectStore(this.formDataObjectStoreName, { keyPath: 'capital' });
        db.createObjectStore(this.imageObjectStoreName, { autoIncrement: true });
      };

      request.onsuccess = (event) => {
        const db = request.result;
        console.log('Database opened successfully');
        console.log('Available object stores:', db.objectStoreNames);
        resolve(db);
      };

      request.onerror = (event) => {
        console.error('Error opening database:', request.error);
        reject(request.error);
      };
    });
  }

  saveFormData(data: any): Promise<void> {
    return this.openDb().then((db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([this.formDataObjectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.formDataObjectStoreName);

        const request = objectStore.put(data);

        request.onsuccess = (event) => {
          resolve();
        };

        request.onerror = (event) => {
          console.error('Error saving form data:', request.error);
          reject('Error saving form data');
        };
      });
    });
  }

saveImage(image: File): Promise<number> {
  return this.openDb().then((db) => {
    return new Promise<number>((resolve, reject) => {
      const transaction = db.transaction([this.imageObjectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.imageObjectStoreName);

      const request = objectStore.add(image);

      request.onsuccess = (event) => {
        const imageId: number = request.result as number;
        resolve(imageId);
      };

      request.onerror = (event) => {
        console.error('Error saving image:', request.error);
        reject('Error saving image');
      };
    });
  });
}

getImage(imageId: number): Promise<string> {
  return this.openDb().then((db) => {
    return new Promise<string>((resolve, reject) => {
      const transaction = db.transaction([this.imageObjectStoreName], 'readonly');
      const objectStore = transaction.objectStore(this.imageObjectStoreName);

      const request = objectStore.get(imageId);

      request.onsuccess = (event) => {
        console.log('Image request successed')
        const imageBlob = request.result;
        if (imageBlob) {
          const imageUrl = URL.createObjectURL(imageBlob);
          resolve(imageUrl);
        } else {
          reject('Image not found');
        }
      };

      request.onerror = (event) => {
        console.error('Error retrieving image:', request.error);
        reject('Error retrieving image');
      };
    });
  });
}


  
}
