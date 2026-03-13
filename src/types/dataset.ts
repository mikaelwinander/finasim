// 1. Firestore Metadata (Lightweight)
// This is what we query to show the user's dashboard list
export interface DatasetMetadata {
    id: string;               // The Firestore document ID
    ownerId: string;          // Must match the user's uid
    name: string;             // e.g., "Q3 Financials"
    storagePath: string;      // e.g., "users/{uid}/datasets/{fileName}.json"
    downloadUrl: string;      // The URL to fetch the raw data blob
    createdAt: number;
    updatedAt: number;
    rowCount?: number;        // Optional quick stat for the UI
    fileSize?: number;        // File size in bytes
  }
  
  // 2. Cloud Storage / IndexedDB Raw Data (Heavy)
  // This represents a single row in the dataset (assuming CSV/JSON structure)
  export interface DatasetRow {
    id: string;               // A unique ID generated for local IndexedDB manipulation
    [key: string]: any;       // Dynamic column fields based on the user's uploaded file
  }
  
  // 3. The complete local representation for the UI when editing
  export interface LocalDataset {
    metadata: DatasetMetadata;
    rows: DatasetRow[];
  }