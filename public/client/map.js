import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
var mapStyles = require('./mapstyles');

const coords = {
  lat: 46.863895,
  lng: -113.994041
};

const GoogleMap = React.createClass({

  onMapCreated(map) {
      
    map.setOptions({
      disableDefaultUI: true,
      styles: mapStyles,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false
    });
  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

    
  render() {
    var self = this;
      
    return (
      <Gmaps
        width={"100%"}
        height={'400px'}
        lat='46.867995'
        lng={coords.lng}
        zoom={14}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        onMapCreated={self.onMapCreated}>
        
            <Marker
              lat={coords.lat}
              lng={coords.lng}
              clickable={false}
              draggable={false}
//              icon={'../img/logo_notext_sm.png'} 
            />
        

      </Gmaps>
    );
  }

});

module.exports = GoogleMap; 