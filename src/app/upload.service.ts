import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  path = "/uploads"

  constructor(private db:AngularFireDatabase, private storage:AngularFireStorage) { }

  saveFileData(url:any, filename:any) {
    this.db.list(this.path).push({filename:filename,url:url})
  }

  getFiles() {
    return this.db.list(this.path)
  }

  uploadFile(file:any){
    const filename = this.path+"/"+Date.now()+"-"+(Math.round(Math.random()*89999+10000))+"-"+file.name
    const uploadTask = this.storage.upload(filename,file)
    const storageRef = this.storage.ref(filename)

    uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe(
          (url)=>this.saveFileData(url,filename)
        )
      })
    ).subscribe()
    
    return uploadTask.percentageChanges()
  }
  deleteFile(file:any){
    console.log(file)
    this.storage.ref(this.path).child(file.filename).delete().subscribe(
      ()=>this.db.list(this.path).remove(file.key).then(
        ()=>console.log("A fájl törölve UmU")
      ).catch(
        (err)=> console.log(err)
      )
    )
  }
}
