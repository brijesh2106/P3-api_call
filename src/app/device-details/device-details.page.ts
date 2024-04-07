import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {
  deviceDetails: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getDeviceDetails();
  }

  async getDeviceDetails() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const response = await this.doGet();

      this.deviceDetails = response.data;
      loading.dismiss();
    } catch (error) {
      console.error('Error fetching device details:', error);
      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Failed to fetch device details. Please try again later.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async doGet() {
    const url = 'http://54.157.159.192:8080/ceapi/public/get-device-driver-details';
    const headers = {
      'Content-Type': 'application/json',
      'scac': 'prod',
      'Authorization': 'Bearer bb28fd2e-e194-4c0c-9add-bca0c735d6a3',
      'tenant': '1',
      'request-date': '2019-08-24 00:00:00',
      'to-date': '2019-08-29 00:00:00',
      'android-id': '38ef5de332b484c7'
    };

    const options = {
      method: 'GET', 
      url: url,
      headers: headers,
      params: { size: 'XL' }
    };

    return await Http.request(options);
  }
}