import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeReadEvent, CameraType, FlashMode, RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Slider from '@react-native-community/slider'

const colors = {
  primary: '#4285F4',
  light: '#fff',
  dark: '',
}

const App: React.FC = () => {
  const [flashMode, setFlashMode] = useState<boolean>(false)
  const [cameraType, setCameraType] = useState<keyof CameraType>('back')
  const [cameraZoom, setCameraZoom] = useState<number>(0)
  const flash: keyof FlashMode = flashMode
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off


  const handleCameraZoom = (value: number): void => setCameraZoom(value)

  const handleFlashMode = (): void => setFlashMode(!flashMode)

  const handleCameraType = (): void => setCameraType(
    cameraType === 'back' ? 'front' : 'back'
  )

  const onSuccess = (e: BarCodeReadEvent) => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        barStyle='default'
        backgroundColor={colors.primary}
      />
      <View style={styles.appBar}>
        <Text style={styles.header}>QR Scanner</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.qrScanner}>
          <QRCodeScanner
            onRead={onSuccess}
            vibrate={true}
            cameraProps={{
              flashMode: flash,
              zoom: cameraZoom,
              type: cameraType,
            }}
            topViewStyle={{ display: 'none' }}
            containerStyle={styles.cameraContainer}
            cameraStyle={styles.camera}
          />
          <View style={styles.qrScannerMenu}>
            <View style={styles.cameraZoom}>
              <Icon name='magnify-minus' size={15} color={colors.light} />
              <Slider
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor='#fff'
                style={styles.zoomSlider}
                onValueChange={handleCameraZoom}
              />
              <Icon name='magnify-plus' size={15} color={colors.light} />
            </View>
            <View style={styles.cameraMenu}>
              <TouchableNativeFeedback onPress={handleFlashMode}>
                <View style={styles.qrMenuItem}>
                  <Icon
                    name={flashMode ? 'flashlight' : 'flashlight-off'}
                    size={30}
                    color={colors.light}
                  />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={handleCameraType}>
                <View style={styles.qrMenuItem}>
                  <Icon
                    name='camera-switch'
                    size={30}
                    color={colors.light}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: colors.primary,
    height: 60,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  cameraContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  camera: {
    height: '100%',
  },
  qrScanner: {
    position: 'relative',
    flex: 1,
  },
  qrScannerMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cameraZoom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  zoomSlider: {
    width: '70%',
    height: 80,
  },
  cameraMenu: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  qrMenuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
