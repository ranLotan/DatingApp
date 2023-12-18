import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-layers-tab',
  templateUrl: './layers-tab.component.html',
  styleUrls: ['./layers-tab.component.css']
})
export class LayersTabComponent implements OnInit {
  map: google.maps.Map | undefined;
  
  
  ngOnInit(): void {  
    this.initMap();
  }

  public async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 51.678418, lng: 7.809007 },
      zoom: 8,
    });

    this.map = map;
  }

}
