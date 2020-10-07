import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../gateways.models';
import { ApiService } from '../api.service';

@Component({
  selector: 'device-box',
  templateUrl: './device-box.component.html',
  styleUrls: ['./device-box.component.css']
})
export class DeviceBoxComponent implements OnInit {
	@Input() selected: boolean;
	@Input() device: Device;
  @Output() onRemovedDevice: EventEmitter<Device>;
	@Output() onSelectedDevice: EventEmitter<Device>;

  constructor(private _apiService: ApiService) { 
    this.onRemovedDevice = new EventEmitter();
  	this.onSelectedDevice = new EventEmitter();
  }

  ngOnInit(): void {
  }

  deleteDevice(){
    this._apiService.deleteDevice(this.device.id).subscribe(
      (result) => {
        this.onRemovedDevice.emit(this.device);
      }
    );

    return false;
  }

  selectDevice()
  {
    this.onSelectedDevice.emit(this.device);
    return false;
  }
}
