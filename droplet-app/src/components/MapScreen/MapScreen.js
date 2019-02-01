import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapScreen.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibGlkZW5uIiwiYSI6ImNqcmg2NDU5czA4b3A0M25udmUxcWpjcmEifQ.J9ThJ9sMDK7ANhYkSpVnyg';

class Map extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 42,
      lat: 43,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });


    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([30.5, 50.5])
      .addTo(map);
    }




  render() {
    const { lng, lat, zoom } = this.state;

    return (
        <main ref={el => this.mapContainer = el} className="map-screen" ></main>

    );
  }
}








export default Map;
