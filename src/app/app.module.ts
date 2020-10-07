import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, AppRoutingProviders } from './app.routing';
import { ApiService } from './api.service';
import { GatewaysListComponent } from './gateways-list/gateways-list.component';
import { GatewaysItemComponent } from './gateways-item/gateways-item.component';
import { GatewaysAddComponent } from './gateways-add/gateways-add.component';
import { DeviceBoxComponent } from './device-box/device-box.component';
import { DeviceAddComponent } from './device-add/device-add.component';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysListComponent,
    GatewaysItemComponent,
    GatewaysAddComponent,
    DeviceBoxComponent,
    DeviceAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppRoutingProviders, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
