import React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import GoogleMapReact, { Coords } from 'google-map-react';

import styles from '@src/components/UserResult/Graphics/UserMap/UserMap.scss';

@observer
class UserMap extends React.Component {
  isMarkerShown: boolean = false;
  marker: any;

  @observable
  yourPosition: Coords = { lat: 0, lng: 0 };

  @observable
  finish: Coords = { lat: 56.282974, lng: 44.040006 };

  zoom: number = 16;
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.cardTitle}>карта</div>
        </div>
        <div className={styles.googleMap}>
          {this.setPosition()}
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDnFmP8_m7hdYiKv5k6nFE0fw4qxSLocJ8' }}
            defaultCenter={this.yourPosition}
            defaultZoom={this.zoom}
            onGoogleApiLoaded={({ map, maps }) => {
              this.renderMarkers(map, maps, this.yourPosition);
              this.renderFinishMarkers(map, maps, this.finish);
            }}
            yesIWantToUseGoogleMapApiInternals
          />
        </div>
      </div>
    );
  }

  degToRad = (value: number) => {
    return value * (3.1459 / 180);
  };

  renderMarkers(map: any, maps: any, position: Coords) {
    this.marker = new maps.Marker({
      position: position,
      map,
      title: 'Вы здесь!',
    });
  }

  renderFinishMarkers(map: any, maps: any, position: Coords) {
    this.marker = new maps.Marker({
      position: position,
      map,
      title: `Ваш пункт назначения находится от вас на расстоянии: ${Math.floor(this.distance * 1000)}м.`,
    });
  }

  @action
  setPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.yourPosition.lat = position.coords.latitude;
        this.yourPosition.lng = position.coords.longitude;
        this.isMarkerShown = true;
      });

      console.log(this.yourPosition);
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
  };

  @computed
  get distance() {
    let R = 6371; // Radius of the earth in km
    let dLat = this.degToRad(this.finish.lat - this.yourPosition.lat); // deg2rad below
    let dLon = this.degToRad(this.finish.lng - this.yourPosition.lng);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(this.yourPosition.lat)) *
        Math.cos(this.degToRad(this.finish.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }
}
export default UserMap;
