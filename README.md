# Weather Influence

## Install Required Tools

Follow the [React Native](https://reactnative.dev/docs/environment-setup) development environment setup.

## Install Client Dependencies

```
$ cd client
$ yarn
$ npx pod-install ios
```

## Run the Client

```
$ react-native run-ios
```

For Android, first launch the emulator from the Android Virtual Device (AVD) Manager in Android Studio and then:

```
$ react-native run-android
```

## TODO

- [ ] reads the CPU temperature from the machine
- [x] reads the ambient temperature from a weather API (feel free to choose one but https://openweathermap.org/api looks suitable)
- [x] displays these two temperatures (CPU UI using static temperature for now)
- [x] collect and store the last 100 results locally
- [ ] Run 1 and 2 above every 30 minutes. Please note that the task should run regardless of
      the fact that the mobile screen is off (eg, the user is not using the mobile phone) or if the application is suspended or sleeping.
