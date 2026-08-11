import { AfterViewInit, Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import * as L from 'leaflet';

type LatLng = {
  lat: number;
  lng: number;
};

/**
 * width 100%
 * height 260
 *
 */
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit {

  @ViewChild('mapContainer')
  mapContainer!: ElementRef<HTMLDivElement>;
  map = signal<L.Map | null>(null);
  latLng = input.required<LatLng>();
  zoom = input<number>(14);

  async ngAfterViewInit() {

    const map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView(
      this.latLng(),
      this.zoom(),
    );

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(map);

    L.marker(this.latLng()).addTo(map);

    this.map.set(map);

  }

}
