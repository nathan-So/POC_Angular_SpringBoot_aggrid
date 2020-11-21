import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})

export class CourseDialogComponent implements OnInit {

  userForm : FormGroup = new FormGroup({});

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef <CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.userForm = this.formBuilder.group({
      dialogProjectCode: [,[Validators.required, Validators.pattern("^[0-9]*$")]],
      dialogName: [,[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dialogDate: [,[Validators.required, Validators.pattern("^[0-9]*$")]],
      dialogPlateform: [,[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dialogTechnology: [,[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dialogClientProject: [,[Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
    });
  };

  ngOnInit(): void {};

  get f(){
    return this.userForm.controls;
  };

  onSubmitForm(){
    this.dialogRef.close(this.data);
  };

  save(){
    this.dialogRef.close(this.data);
  };

  close(){
    this.dialogRef.close();
  };

};