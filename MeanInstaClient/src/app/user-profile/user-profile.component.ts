import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload'; //environment.apiBaseUrl+'/api/upload'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  files: Array<string> = [];
  showSucessMessage: boolean;
  serverErrorMessages: string;
  tempFileNameArr: Array<string> = [];

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.tempFileNameArr = res['file'];
        this.tempFileNameArr.forEach(file => {
          if (file.includes(this.userDetails.userId)){
            this.files.push(file);
          }
        });
      },
      err => { 
        console.log(err);
        
      }
    );

    this.uploader.onAfterAddingFile = (file) => { 
      file.file.name = this.userDetails.userId +  "__" + file.file.name;
      file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       console.log('ImageUpload:uploaded:', item, status, response);
       alert('File uploaded successfully');
    };


  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}