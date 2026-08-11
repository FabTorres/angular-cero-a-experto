import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [JsonPipe, DecimalPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `
})
export class FullscreenMapPage {

  map = signal<L.Map | null>(null);
  zoom = signal(14);
  coordinates = signal({
    lat: -34.6037,
    lng: -58.3816
  });


  zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zoom());
  })


  ngAfterViewInit(): void {

    const { lat, lng } = this.coordinates();
    const map = L.map('map', {
      zoomControl: false,
      zoomAnimation: true
    }).setView(
      [lat, lng],
      this.zoom()
    );

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(map);

    this.mapListeners(map);


  }

  mapListeners(map: L.Map) {

    const FullscreenControl = L.Control.extend({

      onAdd() {
        const button = L.DomUtil.create(
          'button',
          'leaflet-bar'
        );

        button.innerHTML = '⛶';

        button.onclick = () => {
          const mapElement = document.getElementById('map');

          mapElement?.requestFullscreen();
        };

        return button;
      }

    });

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    this.map.set(map);
  }

}
