import React from "react"

const MapLocation2 = () => {
  return (
    <div className="map-section map">
      <iframe
        title="Store Location"
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"


        src="https://www.google.com/maps?q=31.774012,35.230711&z=15&output=embed"
      />
    </div>

  )


}

export default MapLocation2
