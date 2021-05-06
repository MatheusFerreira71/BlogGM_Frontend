import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseAuth: AngularFireAuth, private firebaseStorage: AngularFireStorage) { }

  async signInWithEmail(email: string, password: string) {
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  async signUpWithEmail(email: string, password: string) {
    return await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
  }

  async signOut() {
    return await this.firebaseAuth.signOut()
  }

  async deleteAccount() {
    return await (await this.firebaseAuth.currentUser).delete()
  }

  getCurrentUser() {
    return this.firebaseAuth.currentUser;
  }

  uploadFile(path: string, file: File) {
    return this.firebaseStorage.ref(path).put(file);
  }

  deleteFile(path: string) {
    return this.firebaseStorage.ref(path).delete();
  }
  getFileUrl(path: string) {
    return this.firebaseStorage.ref(path).getDownloadURL()
  }

}
