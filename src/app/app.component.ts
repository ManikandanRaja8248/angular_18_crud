import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeFrom!:FormGroup;
  employeeObj:EmployeeModel = new EmployeeModel();
  employeeList:EmployeeModel[]=[];

  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const paserData = JSON.parse(oldData);
      this.employeeList = paserData;

    }
  }

  createForm(){
    this.employeeFrom = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pincode: new FormControl(this.employeeObj.pincode,[Validators.required,Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state),
    })
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const paserData = JSON.parse(oldData);
      this.employeeFrom.controls['empId'].setValue(paserData.length +1);
      this.employeeList.unshift(this.employeeFrom.value);
    }else{
      this.employeeList.unshift(this.employeeFrom.value);      
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
  }

  onEdit(item:EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }
  onUpdate(){
    const record = this.employeeList.find(item=>item.empId == this.employeeFrom.controls['empId'].value);
    if(record){
      record.address =  this.employeeFrom.controls['address'].value;
      record.name =  this.employeeFrom.controls['name'].value;
      record.contactNo =  this.employeeFrom.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete){
      const index = this.employeeList.findIndex(item=>item.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }
  }
}
