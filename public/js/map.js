mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: 9,
    center: listing.geometry.coordinates
});

const marker = new mapboxgl.Marker()
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${listing.location},${listing.country}</h4><p>Exact Location Provided After Booking</p>`))
.addTo(map);

