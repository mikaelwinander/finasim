import Dexie, { type Table } from 'dexie';
import type { DatasetRow } from '../types/dataset';

// We extend your base DatasetRow to include the datasetId just for the local database
export interface LocalRow extends DatasetRow {
  datasetId: string;
}

export class SaaSLocalDatabase extends Dexie {
  // Declare our table and its TypeScript type (Table<Type, PrimaryKeyType>)
  datasetRows!: Table<LocalRow, string>;

  constructor() {
    super('SaaSLocalDb');
    
    // Define the schema. 
    // 'id' is the primary key. 'datasetId' is indexed for fast lookups.
    this.version(1).stores({
      datasetRows: 'id, datasetId' 
    });
  }
}

// Export a single instance of the database
export const localDb = new SaaSLocalDatabase();

// ==========================================
// Helper Functions for Local Data Management
// ==========================================

/**
 * Bulk insert or replace rows for a specific dataset
 */
export const saveDatasetRowsLocally = async (datasetId: string, rows: DatasetRow[]): Promise<void> => {
  const localRows: LocalRow[] = rows.map(row => ({
    ...row,
    datasetId
  }));
  
  // Use bulkPut to efficiently insert or update massive arrays of data
  await localDb.datasetRows.bulkPut(localRows);
};

/**
 * Fetch all rows for a specific dataset from IndexedDB
 */
export const getLocalDatasetRows = async (datasetId: string): Promise<DatasetRow[]> => {
  // Query using the datasetId index we created
  const rows = await localDb.datasetRows.where('datasetId').equals(datasetId).toArray();
  
  // Strip the datasetId before returning to the UI to match the strict DatasetRow type
  return rows.map(({ datasetId: _, ...rest }) => rest as DatasetRow);
};

/**
 * Update a single specific row locally (e.g., when a user edits a cell in the data grid)
 */
export const updateLocalRow = async (rowId: string, updates: Partial<DatasetRow>): Promise<void> => {
  await localDb.datasetRows.update(rowId, updates);
};

/**
 * Delete all rows for a specific dataset (cleanup)
 */
export const clearLocalDataset = async (datasetId: string): Promise<void> => {
  // Find all keys for this dataset and delete them in bulk
  const keys = await localDb.datasetRows.where('datasetId').equals(datasetId).primaryKeys();
  await localDb.datasetRows.bulkDelete(keys);
};