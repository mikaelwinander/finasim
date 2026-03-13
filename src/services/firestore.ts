import { collection, doc, setDoc, getDocs, query, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { DatasetMetadata } from '../types/dataset';

// Helper to reliably get the multi-tenant subcollection path
const getDatasetsCollection = (userId: string) => 
  collection(db, 'users', userId, 'datasets');

/**
 * Creates a new dataset metadata document in Firestore
 */
export const createDatasetMetadata = async (
  userId: string, 
  metadata: Omit<DatasetMetadata, 'id' | 'createdAt' | 'updatedAt'>
): Promise<DatasetMetadata> => {
  const collectionRef = getDatasetsCollection(userId);
  const newDocRef = doc(collectionRef);
  
  const newDataset: DatasetMetadata = {
    ...metadata,
    id: newDocRef.id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(newDocRef, newDataset);
  return newDataset;
};

/**
 * Fetches all dataset metadata for a specific user's dashboard
 */
export const getUserDatasets = async (userId: string): Promise<DatasetMetadata[]> => {
  const q = query(getDatasetsCollection(userId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as DatasetMetadata);
};

/**
 * Deletes a dataset metadata document
 */
export const deleteDatasetMetadata = async (userId: string, datasetId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'datasets', datasetId);
  await deleteDoc(docRef);
};