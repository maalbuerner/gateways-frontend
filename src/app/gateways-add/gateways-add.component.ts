import { Component, OnInit } from '@angular/core';
import { Gateway } from '../gateways.models';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from '@angular/forms';

function isAddressFormat(address)
{
	return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(address);
}

function isAddress(control: AbstractControl): { [s: string]: boolean } {
  if (!isAddressFormat(control.value)) {
    return {isAddress: true};
  }
}

@Component({
  selector: 'app-gateways-add',
  templateUrl: './gateways-add.component.html',
  styleUrls: ['./gateways-add.component.css']
})
export class GatewaysAddComponent implements OnInit {
	newGateway: Gateway;
	errorAddGateway: string;
  myForm: FormGroup;                
  serial: AbstractControl; 
  name: AbstractControl; 
  address: AbstractControl; 

  constructor(private _apiService: ApiService,
    _fb: FormBuilder, private _router: Router, 
  				private _route: ActivatedRoute) {
	    this.myForm = _fb.group({
	      'serial': ['', Validators.required],
	      'name': ['', Validators.required],
	      'address': ['', Validators.compose([
	      Validators.required, isAddress])]
	    });

	    this.serial = this.myForm.controls['serial'];
	    this.name = this.myForm.controls['name'];
	    this.address = this.myForm.controls['address'];

        this.newGateway = new Gateway("", "", "");
	}		

  ngOnInit(): void {
  }

  onSubmit(form: any)
  {
    if(this.myForm.valid)
    {
      this.newGateway.serial = this.serial.value;
      this.newGateway.name = this.name.value;
      this.newGateway.address = this.address.value;

      this._apiService.addGateway(this.newGateway).subscribe(
        (data) => {
         	this.errorAddGateway = "";
			this._router.navigate(['/', this.newGateway.serial]);
        },
        (err) => {
          this.errorAddGateway = err.error.message;
          if(!this.errorAddGateway)
            this.errorAddGateway = err;
        }
      );
      this.myForm.reset();
    }
    return false;
  }
}
