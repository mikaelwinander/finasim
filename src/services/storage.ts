import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Uploads a raw dataset file (Blob or File) to Firebase Cloud Storage.
 * Returns the download URL once complete.
 */
export const uploadDatasetFile = async (
  userId: string,
  fileId: string, // Usually matches the Firestore document ID for consistency
  file: File | Blob
): Promise<string> => {
  const filePath = `users/${userId}/datasets/${fileId}`;
  const storageRef = ref(storage, filePath);
  
  // Upload the raw data
  await uploadBytes(storageRef, file);
  
  // Return the secure URL so we can save it to Firestore metadata
  return await getDownloadURL(storageRef);
};

/**
 * Deletes a raw dataset file from Firebase Cloud Storage.
 */
export const deleteDatasetFile = async (
  userId: string,
  fileId: string
): Promise<void> => {
  const filePath = `users/${userId}/datasets/${fileId}`;
  const storageRef = ref(storage, filePath);
  
  await deleteObject(storageRef);
};