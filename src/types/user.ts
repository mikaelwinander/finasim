export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    // You can add additional fields here later if you store custom user profiles in Firestore
    createdAt?: number; 
  }
  
  // This is the missing piece!
  export interface AuthContextType {
    currentUser: AppUser | null;
    loading: boolean;
  }