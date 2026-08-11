import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import * as L from 'leaflet';
import { v4 as UUIDV4 } from 'uuid';

interface Marker {
  id: string;
  leafletMarker: L.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {

  map = signal<L.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {

    const [lat, lng] = [48.852275, 2.339185];
    this.map.set(L.map('map', {
      zoomControl: false,
      zoomAnimation: true
    }).setView([lat, lng], 14));

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map()!);

    this.mapListeners(this.map()!);
  }

  mapListeners(map: L.Map) {
    map.on('click', (event) => this.mapClick(event));
  }

  mapClick(event: L.LeafletMouseEvent) {
    const leafletMarker = L.marker(event.latlng).addTo(this.map()!);

    const newMarker: Marker = {
      id: UUIDV4(),
      leafletMarker: leafletMarker
    }

    this.markers.set([newMarker, ...this.markers()]);
  }

  flyToMarker(latLng: L.LatLngExpression) {
    if (!this.map()) return;
    this.map()?.flyTo(latLng, 15);
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const map = this.map()!;

    marker.leafletMarker.remove();

    this.markers.update((markers) => markers.filter((m) => m.id !== marker.id));
    // this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
