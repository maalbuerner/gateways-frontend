import { Component, OnInit } from '@angular/core';
import { Gateway, Device } from '../gateways.models';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from '@angular/forms';

function isNumber(control: AbstractControl): { [s: string]: boolean } {
  if (isNaN(control.value)) {
    return {isNumber: true};
  }
}

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {
  newDevice: Device;
  errorAddDevice: string;
  successAddDevice: string;
  gateway: string;
  myForm: FormGroup;                
  uid: AbstractControl; 
  vendor: AbstractControl; 
  status: AbstractControl; 
  created_at: AbstractControl;

  constructor(private _apiService: ApiService,
    _fb: FormBuilder, private _router: Router, 
  				private _route: ActivatedRoute) {
    this.myForm = _fb.group({
      'uid': ['', Validators.compose([
      Validators.required, isNumber]) ],
      'vendor': ['', Validators.required],
      'status': ['', Validators.required],
      'created_at': ['', Validators.required]
    });
    this.uid = this.myForm.controls['uid'];
    this.vendor = this.myForm.controls['vendor'];
    this.status = this.myForm.controls['status'];
    this.created_at = this.myForm.controls['created_at'];

    this.newDevice = new Device(123, 0, '', (new Date()).toISOString().split('T')[0], false, 0);

    _route.params.subscribe(params => { 
          this.newDevice.gateway = params['serial_gateway'];           
          this.gateway = params['name_gateway'];           
      });
  }

  ngOnInit(): void {
  }

  onSubmit(form: any)
  {
    if(this.myForm.valid)
    {
      this.newDevice.uid = parseInt(this.uid.value);
      this.newDevice.vendor = this.vendor.value;
      this.newDevice.created_at = this.created_at.value;
      this.newDevice.status = this.status.value;

      this._apiService.addDevice(this.newDevice).subscribe(
        (data) => {
          this.successAddDevice = "Device added successfully.";
          this.errorAddDevice = "";
			    this._router.navigate(['/', this.newDevice.gateway]);
        },
        (err) => {
          this.successAddDevice = "";
          this.errorAddDevice = err.error.message;
          if(!this.errorAddDevice)
            this.errorAddDevice = err;
        }
      );

      this.myForm.reset();
      this.status.reset('');
    }

    return false;
  }
}
