import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Gateway, Device } from './gateways.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private API_SERVER_URL: string = 'http://localhost:3268/api';

	constructor(private http: HttpClient) {}

	public getGateways()
	{
		return this.http.get(`${this.API_SERVER_URL}/gateways`, {responseType: 'json'});
	}
	public getGatewayDevices(gatewaySerial: string)
	{
		return this.http.get(`${this.API_SERVER_URL}/gateways/${gatewaySerial}/devices`, {responseType: 'json'});
	}
	public getDevices()
	{
		return this.http.get(`${this.API_SERVER_URL}/devices`);
	}
	public deleteDevice(id: number)
	{
		return this.http.delete(`${this.API_SERVER_URL}/devices/${id}`);
	}

	public addGateway(gateway: Gateway) 	{
		let json = JSON.stringify(gateway);
		let param = json;
		let header = new HttpHeaders({'Content-Type':'application/json'});

		return this.http.post<any>(`${this.API_SERVER_URL}/gateways/`, 
			param, {headers: header});
	}

	public addDevice(device: Device) {
		let json = JSON.stringify(device);
		let param = json;
		let header = new HttpHeaders({'Content-Type':'application/json'});

		return this.http.post<any>(`${this.API_SERVER_URL}/devices/`, 
			param, {headers: header});
	}
}
