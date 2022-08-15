## Awesome PokeTeam

# Steps for Android installation

1. Install node
2. Install watchman
   (Linux and macOS):
   1. Download and extract the release for your system from the [latest release](https://github.com/facebook/watchman/releases/tag/v2022.08.15.00)
   2.  
    ```
    $ unzip watchman-*-linux.zip 
    $ cd watchman-vYYYY.MM.DD.00-linux
    $ sudo mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman
    $ sudo cp bin/* /usr/local/bin
    $ sudo cp lib/* /usr/local/lib
    $ sudo chmod 755 /usr/local/bin/watchman
    $ sudo chmod 2777 /usr/local/var/run/watchman 
    ```
3. Install npx: ```npm install -g npx```

# Steps for Android emulating

0. First of all, execute: ```npm install```
1. Plug your Android device with USB Debugging enabled. If device is not found, follow these [instructions](https://reactnative.dev/docs/running-on-device)
2. On one terminal, execute: ``` npx react-native start ```
3. On another terminal, execute: ``` npx react-native run-android ```
   
**Important**: Dont stop execution number 2, it has to keep running

## Steps for debugging

1. Start your application by using above steps number 2 and 3.
2. On the terminal with step 2 running, press letter *d*.
3. On the app select Debug option on the pop up that will appear.
4. It will open a browser tab.
5. Then, on the terminal with step 2 running, press letter *r*.
6. Now, the app will be debugging on the browser instead of the terminal, and it can be debugged as a normal web app.
