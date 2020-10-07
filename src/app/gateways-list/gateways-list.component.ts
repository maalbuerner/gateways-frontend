import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Gateway } from '../gateways.models';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-gateways-list',
  templateUrl: './gateways-list.component.html',
  styleUrls: ['./gateways-list.component.css']
})

export class GatewaysListComponent implements OnInit {
	public gateways: Array<Gateway>;
	public currentGatewaySerial: string;
	errMessage: string;

	constructor(private _apiService: ApiService,
    private _route: ActivatedRoute) { 
		this.errMessage = "";
	}

	ngOnInit(): void {
		this._apiService.getGateways().subscribe(
			(data) => {
				this.gateways = <any>data;
			    this._route.params.subscribe(params => {
			    	if(params['serial'])
				        this.currentGatewaySerial = params['serial'];           
			    	else
   						this.currentGatewaySerial = this.gateways[0].serial;

			    });
				this.errMessage ="";
			},
			(err) => {
				this.errMessage = err.message;
			}
		);
	}

	handleGatewayClicked(gateway: Gateway)
	{	
		this.currentGatewaySerial = gateway.serial;
	}

	handleChanceDetected(message: string)
	{
		this.errMessage = message;
	}
}
