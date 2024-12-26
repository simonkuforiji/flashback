// Importing necessary modules and components from React, React Native, Expo, and local files
import { Camera, CameraType } from "expo-camera"; // Import Camera components from Expo
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { TouchableOpacity, View, ImageBackground } from "react-native"; // Import components from React Native for UI
import * as FileSystem from "expo-file-system"; // Import FileSystem from Expo for file management
import * as MediaLibrary from "expo-media-library"; // Import MediaLibrary from Expo to access the media library
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons for icons
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for more icons
import { Entypo } from "@expo/vector-icons"; // Import Entypo for additional icons
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo for picking images from the library
import styles from "./cameraStyles"; // Import custom styles for the camera component

const CameraComponent = () => {
  // Constants and state variables initialization
  const albumName = "capture"; // Name of the album where pictures will be saved
  const [type] = useState(CameraType.back); // State for camera type, defaulting to the back camera
  const [CameraPermission, setCameraPermission] = useState(); // State for storing camera permission status
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null); // State for storing media library permission status
  const [image, setImage] = useState(null); // State for storing the currently selected image

  // Effect hook to request permissions on component mount
  useEffect(() => {
    (async () => {
      const Camerastatus = await Camera.requestCameraPermissionsAsync(); // Request camera permissions
      setCameraPermission(Camerastatus.status); // Update state with camera permission status

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync(); // Request media library permissions
      setMediaLibraryPermission(mediaLibraryStatus.status); // Update state with media library permission status
    })();
  }, []);

  // Function to take a picture using the camera
  const takePicture = async () => {
    try {
      if (!cameraRef) {
        console.error("Camera reference not available"); // Log error if camera reference is not set
        return;
      }

      const photo = await cameraRef.takePictureAsync(); // Take picture and store the result

      const filename = `${FileSystem.documentDirectory}photo.jpg`; // Define filename and path for the new photo
      await FileSystem.moveAsync({
        from: photo.uri,
        to: filename,
      }); // Move the photo to the defined path

      const asset = await MediaLibrary.createAssetAsync(filename); // Create an asset in the media library for the new photo
      const album = await MediaLibrary.getAlbumAsync(albumName); // Check if the album exists
      if (album == null) {
        await MediaLibrary.createAlbumAsync(albumName, asset, true); // If album doesn't exist, create it
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true); // If album exists, add the photo to it
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur
    }
  };

  // Function to pick an image from the media library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
      quality: 1, // Request the highest quality image
    });

    console.log(result); // Log the result for debugging

    if (!result.canceled) {
      setImage(result.assets[0].uri); // If the user didn't cancel, update the image state with the selected image
    }
  };

  // Function to remove the current image overlay
  const removeOverlay = async () => {
    setImage(null); // Clear the current image
  };

  let cameraRef; // Variable to hold the camera reference

  // Render function for the camera component UI
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => (cameraRef = ref)} // Set the cameraRef to the current camera instance
      >
        <View style={styles.imageOverlay}>
          {image ? (
            // If there is an image selected, display it with overlay buttons
            <ImageBackground source={{ uri: image }} style={styles.image}>
              <>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Ionicons
                      style={styles.cameraIcon}
                      name="camera"
                      size={42}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainerImg}>
                  <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <FontAwesome
                      name="photo"
                      size={32}
                      style={styles.photoIcon}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainerCancel}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={removeOverlay}
                  >
                    <Entypo
                      name="cross"
                      size={32}
                      color="black"
                      style={styles.cancelIcon}
                    />
                  </TouchableOpacity>
                </View>
              </>
            </ImageBackground>
          ) : (
            // If no image is selected, display buttons for taking a picture or selecting an image
            <>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                  <Ionicons
                    style={styles.cameraIcon}
                    name="camera"
                    size={42}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainerImg}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <FontAwesome
                    name="photo"
                    size={32}
                    style={styles.photoIcon}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainerCancel}>
                <TouchableOpacity style={styles.button} onPress={removeOverlay}>
                  <Entypo
                    name="cross"
                    size={32}
                    color="black"
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;
