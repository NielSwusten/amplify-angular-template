import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-searchmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchmap.component.html',
  styleUrl: './searchmap.component.css'
})
export class SearchmapComponent {
  @Output() locationFound = new EventEmitter<{ lat: number; lon: number; query: string }>();
  
  suggestions: any[] = [];
  private searchSubject = new Subject<string>(); 

  constructor(private http: HttpClient) {
    this.searchSubject.pipe(
      debounceTime(300), 
      switchMap(query => this.fetchAutocomplete(query)),
      catchError(error => { 
        console.error('Autocomplete error:', error); 
        return of([]); 
      })
    ).subscribe(data => {
      this.suggestions = data;
    });
  }

  onSearchInput(query: string): void {
    if (query.length < 3) { 
      this.suggestions = [];
      return;
    }
    this.searchSubject.next(query); 
  }

  fetchAutocomplete(query: string) {
    const autocompleteUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
    return this.http.get<any[]>(autocompleteUrl);
  }

  selectSuggestion(suggestion: any): void {
    this.suggestions = [];
    this.searchLocation(suggestion.display_name);
  }

  searchLocation(query: string): void {
    if (!query) return;

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    this.http.get<any[]>(geocodeUrl).subscribe(data => {
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        this.locationFound.emit({ lat, lon, query });
      } else {
        alert('Location not found');
      }
    }, error => {
      console.error('Error fetching location:', error);
    });
  }
}
