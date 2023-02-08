import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import {
  icon,
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  map,
  marker,
  Marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnChanges {
  @Input() order!: Order;
  @Input() readonly = false;

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    // iconAnchor is how the icon is positioned over the location.
    iconAnchor: [21, 42],
  });

  // Selects a tag from the html file (e.g. <div #map></div>).
  // {static: true} makes it available in ngOnChanges method.
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) {}

  // Executes the map whenever a variable changes.
  ngOnChanges(): void {
    if (!this.order) return;

    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  // Creates the map.
  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      // Does not show leaflet in bottom right of map.
      attributionControl: false,
    })
      // Sets the map's default latitute and longitude with a zoom of 1.
      .setView(this.DEFAULT_LATLNG, 1);

    // Uses the open street map (i.e. osm) tile layer on our map.
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Moves the marker by clicking on the map.
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  // Sets the marker on the user's current latitude and longitude.
  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  // Creates a new marker, or changes the marker's latitude and longitude position.
  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;

    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    // Sets the marker's latitude and longitude after dragging.
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  // Shows a read only version of the map so that addresslatlng cannot be changed.
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  // Needed for MongoDB because it cannot accept it if addresLatLng if it has more than 8 decimals.
  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  // Gets the order's addressLatLng.
  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
