import { useCallback, useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  getApplicationName,
  isBatteryCharging,
} from 'react-native-device-info';
import { log } from '@utils/console';
import { locationStateSelector } from '@store/slices';
import { useDispatch, useSelector } from 'react-redux';

export default function useLocation() {
  const [location, setLocation] = useState<Geolocation.GeoPosition>(
    {} as Geolocation.GeoPosition,
  );
  const displayName = getApplicationName();
  const watchId = useRef<number | null>(null);

  const { timer, isServiceActive } = useSelector(locationStateSelector);

  useEffect(() => {
    if (!isServiceActive) {
      Geolocation.clearWatch(watchId.current!);
      // Geolocation.stopObserving();
    }
  }, [isServiceActive]);

  const hasPermissionIOS = useCallback(async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  }, [displayName]);

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  }, [hasPermissionIOS]);

  const getLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation({} as Geolocation.GeoPosition);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: timer,
        maximumAge: timer * 2,
        forceRequestLocation: true,
      },
    );
  }, [hasLocationPermission, timer]);

  const getLocationUpdates = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (isServiceActive) {
      watchId.current = Geolocation.watchPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          setLocation({} as Geolocation.GeoPosition);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: timer,
          fastestInterval: timer / 2,
          forceRequestLocation: true,
          showsBackgroundLocationIndicator: true,
        },
      );
    }
  }, [hasLocationPermission, isServiceActive, timer]);

  const removeLocationUpdates = useCallback(() => {
    Geolocation.clearWatch(watchId.current!);
    watchId.current = null;
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  return {
    location,
    getLocationUpdates,
  };
}
