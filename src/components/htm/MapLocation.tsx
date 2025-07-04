import React from "react"

const MapLocation = () => {
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
        src="https://www.google.com/maps?q=39.854327,44.680681&z=15&output=embed"
      />
    </div>
  )
}

export default MapLocation
