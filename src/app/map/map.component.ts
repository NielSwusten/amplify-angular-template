import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([50.9529593, 5.35409304569898], 16);  // Default location (for fallback)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Custom icon for the user marker
    const userIcon = L.icon({
      iconUrl: 'assets/user.png',  // Path to your custom marker image
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Anchor point of the icon (where the marker will be placed)
      popupAnchor: [0, -32] // Popup anchor for the marker's popup
    });

    // Get user's current location with high accuracy
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Set map view to user's current location
          this.map.setView([latitude, longitude], 16);

          // Add a marker at the user's location
          L.marker([latitude, longitude], { icon: userIcon })
            .addTo(this.map)
            .bindPopup('You are here')
            .openPopup();
        },
        (error) => {
          console.error('Error getting location', error);
          // Optionally, set a fallback or alert
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Timeout after 5 seconds if no location found
          maximumAge: 0 // Don't use a cached location
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
