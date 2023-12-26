import { Component, Input, OnInit } from '@angular/core';
import { IReport } from 'src/app/_interfaces/report';
import { ILocation } from 'src/app/_interfaces/user-name';
@Component({
  selector: 'app-layers-tab',
  templateUrl: './layers-tab.component.html',
  styleUrls: ['./layers-tab.component.css']
})

export class LayersTabComponent implements OnInit {
  private map: google.maps.Map | undefined;  
  
  @Input()
  public reports: IReport[] = []
  
  ngOnInit(): void {  
    this.initMap();
  }

  public async initMap(): Promise<void> {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: {  lat: 49, lng: 2 },
      zoom: 8,
      mapId: 'repots_map'
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Add some markers to the map.
  const markers = this.reports.map((report, i) => {
    const label = labels[i % labels.length];
    const latLong = { lat: report.lat, lng: report.long };
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: label,
      glyphColor: "white",
    })
    const marker = new AdvancedMarkerElement({
      map: map,
      position: latLong,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(latLong.lat + ", " + latLong.lng);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  // new MarkerClusterer({ markers, map });

    this.map = map;
  }

}
