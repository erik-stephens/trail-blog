
import Image from 'next/image'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Points = {
  azTerminus: [37.00115017754844, -112.03498987257612],
}

const IndexMap = ({ images }) => {
  return (
      <MapContainer key={images[0].src} center={images[parseInt(images.length / 2)].gps} zoom={7} scrollWheelZoom={false} style={{height: 800, width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {images.map(({ id, src, width, height, gps }) => (
        <Marker key={id} position={gps}>
          <Popup>
            <Image src={src} width={width} height={height} />
            <h3 style={{textAlign: 'center'}}>
            <Link href={`/posts/${id}`}>{id}</Link>
            </h3>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

const PostMap = ({ images }) => {
  return (
    <MapContainer key={images[0].src} center={images[0].gps} zoom={12} scrollWheelZoom={false} style={{height: 600, width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {images.map(({ src, width, height, gps }) => (
        <Marker key={src} position={gps}>
          <Popup><Image src={src} width={width} height={height} /></Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export { IndexMap, PostMap }
