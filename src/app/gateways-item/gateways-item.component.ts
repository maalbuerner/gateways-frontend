import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gateway, Device } from '../gateways.models';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gateways-item',
  templateUrl: './gateways-item.component.html',
  styleUrls: ['./gateways-item.component.css']
})
export class GatewaysItemComponent implements OnInit {
	@Input() selected: boolean;
	@Input() gateway: Gateway;
	@Output() onGatewaySelected: EventEmitter<Gateway>;
	devices: Array<Device>;
  errorAddDevice: string;
  successAddDevice: string;
  currentDeviceId: number;

  constructor(private _apiService: ApiService,
    private _router: Router, private _route: ActivatedRoute) {
    this.onGatewaySelected = new EventEmitter();
  }

  ngOnInit(): void {
  	if(this.selected)
  	{
      this.errorAddDevice = "";
      this.successAddDevice = "";
  		this.getDevices();
  	}
  }

  clicked() {
    this.onGatewaySelected.emit(this.gateway);
    this.getDevices();
    return false;
  }

  getDevices()
  {
    this._apiService.getGatewayDevices(this.gateway.serial).subscribe(
      (data)=>{
        this.devices = <any>(data);
      }
    );
  }

  onModalClose(){
    this.successAddDevice = "";
    this.errorAddDevice = "";
    return false;  
  }

  handleRemoveDevice(device: Device){
    const pos = this.devices.indexOf(device);
    this.devices.splice(pos, 1);
    return false;
  }

  onAddDevice()
  {
    this._router.navigateByUrl(`/add-device/${this.gateway.serial}/${this.gateway.name}`);
    return false;
  }

  handleSelectedDevice(device: Device)
  {
    this.currentDeviceId = device.id;
  }
}
