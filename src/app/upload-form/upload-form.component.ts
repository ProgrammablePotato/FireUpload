import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent {
  selectedFiles?: FileList
  currentFileUpload = false
  percentage = 0

  constructor(private uploadFile:UploadService) {}

  selectFiles(event:any) {
    console.log(event.target.files)
    this.selectedFiles = event.target.files[0]
  }
  upload() {
    console.log("upload")
    console.log(this.selectedFiles)
    this.currentFileUpload = true
    this.uploadFile.uploadFile(this.selectedFiles).subscribe(
      (percentage:any)=> {
        this.percentage= Math.round(percentage?percentage:0)
        console.log(percentage)
      }
    )
  }
}
