import React, {useState, useRef, useEffect, useContext} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TouchableOpacity, View} from 'react-native';
import {Text} from '../../../components/typography/text.component';

import {AuthenticationContext} from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({navigation}) => {
  const {user} = useContext(AuthenticationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const devices = useCameraDevices();

  const device = devices.front;

  useEffect(() => {
    (async () => {
      let cameraPermission = false;
      const newCameraPermission = await Camera.requestCameraPermission();
      cameraPermission = newCameraPermission === 'authorized';
      const getCameraPermission = await Camera.getCameraPermissionStatus();
      cameraPermission = getCameraPermission === 'authorized';
      setHasPermission(cameraPermission);
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      AsyncStorage.setItem(`${user.uid}-photo`, photo.path);
      navigation.goBack();
    }
  };

  if (device == null || hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text variant>No access to camera</Text>;
  }

  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={cameraRef}
        device={device}
        isActive={true}
        photo={true}
      />
    </TouchableOpacity>
  );
};
