import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrl: './upload-list.component.css'
})
export class UploadListComponent {
  files:any

  constructor(private upload:UploadService) {
    this.upload.getFiles().snapshotChanges().pipe(
      map(
        (changes) => changes.map((c:any) => ({key:c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(
      (files) => this.files = files
    )
  }
  deleteFile(file:any) {
    this.upload.deleteFile(file)
  }
}
