import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GatewaysListComponent } from './gateways-list/gateways-list.component';
import { GatewaysAddComponent } from './gateways-add/gateways-add.component';
import { DeviceAddComponent } from './device-add/device-add.component';

const appRoutes: Routes = [
	{ path: '', component: GatewaysListComponent },
	{ path: ':serial', component: GatewaysListComponent },
	{ path: 'gateways/add', component: GatewaysAddComponent },	
	{ path: 'add-device/:serial_gateway/:name_gateway', component: DeviceAddComponent },	
	{ path: '**', component: GatewaysListComponent }
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);