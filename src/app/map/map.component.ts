import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { SearchmapComponent } from '../searchmap/searchmap.component';
import { MapScreenComponent } from '../map-screen/map-screen.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [SearchmapComponent, MapScreenComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  latitude = 50.9529593;
  longitude = 5.3540930456989;
  private map!: L.Map;
  private userMarker!: L.Marker | null; // Store the current user marker

  private apiKey = '52684f30-4c4e-4a2d-966b-fa8cb35531da';
  // private apiKey = '52684f30-4c4e-4a2d-966b-blabla';

  private apiUrl = 'https://api.openchargemap.io/v3/poi/';
  private markers: L.Marker[] = []; // To store the markers

  userIcon = L.icon({
    iconUrl: 'assets/user.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  chargerIcon = L.icon({
    iconUrl: 'assets/charging-marker.png', 
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [4, -30]
  });

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
    // this.loadChargingStations();

  }

  private initMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  onLocationFound(event: { lat: number; lon: number; query: string }): void {
    // Check if the user marker already exists, and if so, remove it
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }
  
    // Set the new map view and load charging stations based on the new location
    this.map.setView([event.lat, event.lon], 14);
    this.loadChargingStations(event.lat, event.lon);
  
    // Add the user marker to the map
    this.userMarker = L.marker([event.lat, event.lon], { icon: this.userIcon })
      .addTo(this.map)
      .bindPopup(`<b>${event.query}</b>`)
      .openPopup();
  }
  
  

  private loadChargingStations(latitude: number, longitude: number): void {
    console.log("call has been made")
    const params = {
      output: 'json',
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      distance: '10', // Search radius in km
      distanceunit: 'KM',
      maxresults: '50',
      key: this.apiKey
    };
  
    this.http.get<any[]>(this.apiUrl, { params }).subscribe((data) => {
      // Remove previous markers before adding new ones
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
  
      data.forEach((station) => {
        const lat = station.AddressInfo.Latitude;
        const lon = station.AddressInfo.Longitude;
        const name = station.AddressInfo.Title;
        const address = station.AddressInfo.AddressLine1;
  
        // Add marker to the map
        const marker = L.marker([lat, lon], { icon: this.chargerIcon })
          .addTo(this.map)
          .bindPopup(`<b>${name}</b><br>${address}`);
  
        // Store the marker for future reference if needed
        this.markers.push(marker);
      });
    }, (error) => {
      console.error('Error fetching charging stations:', error);
    });
  }
  
}
