// // app/cleaner/verification/identity-verification-banner2.jsx



// // app/cleaner/verification/scan-nid-front.jsx
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { useRef, useState } from 'react';

// export default function ScanNidFront() {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [flashEnabled, setFlashEnabled] = useState(false);
//   const cameraRef = useRef(null);

//   const handleCapture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       // Photo captured, navigate to confirm page
//       // You can pass the photo URI through route params or state management
//       router.push({
//         pathname: '/cleaner/verification/confirm-nid-front',
//         params: { photoUri: photo.uri }
//       });
//     }
//   };

//   const toggleFlash = () => {
//     setFlashEnabled(!flashEnabled);
//   };

//   const handleProblem = () => {
//     console.log('Problem with scanning');
//   };

//   // Permission handling
//   if (!permission) {
//     return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.permissionContainer}>
//         <Text style={styles.permissionText}>We need camera permission</Text>
//         <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
//           <Text style={styles.permissionButtonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Camera View */}
//       <CameraView 
//         ref={cameraRef}
//         style={styles.camera}
//         facing="back"
//         flash={flashEnabled ? 'on' : 'off'}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Text style={styles.backIcon}>←</Text>
//           </TouchableOpacity>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={toggleFlash}>
//               <Text style={styles.headerIcon}>{flashEnabled ? '💡' : '🔦'}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={styles.headerIcon}>📷</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Progress Bar */}
//         <View style={styles.progressContainer}>
//           <View style={[styles.progressBar, styles.progressBarActive]} />
//           <View style={styles.progressBar} />
//           <View style={styles.progressBar} />
//         </View>

//         {/* Instructions */}
//         <View style={styles.instructions}>
//           <Text style={styles.title}>
//             Place the <Text style={styles.highlight}>Information Page of Nid Card Font Page</Text> in the frame
//           </Text>
//         </View>

//         {/* Camera Frame Overlay */}
//         <View style={styles.cameraContainer}>
//           <View style={styles.cameraFrame}>
//             <View style={styles.frameBorder}>
//               {/* Corner Indicators */}
//               <View style={[styles.corner, styles.cornerTopLeft]} />
//               <View style={[styles.corner, styles.cornerTopRight]} />
//               <View style={[styles.corner, styles.cornerBottomLeft]} />
//               <View style={[styles.corner, styles.cornerBottomRight]} />
//             </View>
//           </View>
//         </View>

//         {/* Problem Link */}
//         <TouchableOpacity style={styles.problemButton} onPress={handleProblem}>
//           <Text style={styles.problemIcon}>❓</Text>
//           <Text style={styles.problemText}>problem with scanning ?</Text>
//         </TouchableOpacity>

//         {/* Capture Button */}
//         <View style={styles.captureContainer}>
//           <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
//             <View style={styles.captureButtonInner} />
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   loadingText: {
//     color: '#fff',
//     textAlign: 'center',
//     marginTop: 100,
//   },
//   permissionContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   permissionText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   permissionButton: {
//     backgroundColor: '#00A7E1',
//     paddingVertical: 14,
//     paddingHorizontal: 32,
//     borderRadius: 24,
//   },
//   permissionButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//   },
//   backIcon: {
//     color: '#fff',
//     fontSize: 24,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   headerIcon: {
//     fontSize: 20,
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     borderRadius: 2,
//   },
//   progressBarActive: {
//     backgroundColor: '#fff',
//   },
//   instructions: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 18,
//     color: '#fff',
//     lineHeight: 26,
//   },
//   highlight: {
//     color: '#00A7E1',
//     fontWeight: '600',
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   cameraFrame: {
//     width: '100%',
//     aspectRatio: 1.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   frameBorder: {
//     width: '90%',
//     height: '70%',
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#fff',
//     borderStyle: 'dashed',
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   corner: {
//     position: 'absolute',
//     width: 20,
//     height: 20,
//     borderColor: '#00A7E1',
//     borderWidth: 3,
//   },
//   cornerTopLeft: {
//     top: -2,
//     left: -2,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     borderTopLeftRadius: 8,
//   },
//   cornerTopRight: {
//     top: -2,
//     right: -2,
//     borderLeftWidth: 0,
//     borderBottomWidth: 0,
//     borderTopRightRadius: 8,
//   },
//   cornerBottomLeft: {
//     bottom: -2,
//     left: -2,
//     borderRightWidth: 0,
//     borderTopWidth: 0,
//     borderBottomLeftRadius: 8,
//   },
//   cornerBottomRight: {
//     bottom: -2,
//     right: -2,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderBottomRightRadius: 8,
//   },
//   problemButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     paddingVertical: 12,
//   },
//   problemIcon: {
//     fontSize: 16,
//   },
//   problemText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   captureContainer: {
//     alignItems: 'center',
//     paddingVertical: 30,
//   },
//   captureButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   captureButtonInner: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     backgroundColor: '#fff',
//   },
// });




// // app/cleaner/verification/scan-nid-back.jsx

// // export default function ScanNidBack() {
// //   const [permission, requestPermission] = useCameraPermissions();
// //   const [flashEnabled, setFlashEnabled] = useState(false);
// //   const cameraRef = useRef(null);

// //   const handleCapture = async () => {
// //     if (cameraRef.current) {
// //       const photo = await cameraRef.current.takePictureAsync();
// //       router.push({
// //         pathname: '/cleaner/verification/confirm-nid-back',
// //         params: { photoUri: photo.uri }
// //       });
// //     }
// //   };

// //   const toggleFlash = () => {
// //     setFlashEnabled(!flashEnabled);
// //   };

// //   const handleProblem = () => {
// //     console.log('Problem with scanning');
// //   };

// //   if (!permission) {
// //     return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
// //   }

// //   if (!permission.granted) {
// //     return (
// //       <View style={styles.permissionContainer}>
// //         <Text style={styles.permissionText}>We need camera permission</Text>
// //         <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
// //           <Text style={styles.permissionButtonText}>Grant Permission</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <CameraView 
// //         ref={cameraRef}
// //         style={styles.camera}
// //         facing="back"
// //         flash={flashEnabled ? 'on' : 'off'}
// //       >
// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <Text style={styles.backIcon}>←</Text>
// //           </TouchableOpacity>
// //           <View style={styles.headerRight}>
// //             <TouchableOpacity onPress={toggleFlash}>
// //               <Text style={styles.headerIcon}>{flashEnabled ? '💡' : '🔦'}</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //               <Text style={styles.headerIcon}>📷</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Progress Bar */}
// //         <View style={styles.progressContainer}>
// //           <View style={[styles.progressBar, styles.progressBarActive]} />
// //           <View style={[styles.progressBar, styles.progressBarActive]} />
// //           <View style={styles.progressBar} />
// //         </View>

// //         {/* Instructions */}
// //         <View style={styles.instructions}>
// //           <Text style={styles.title}>
// //             Place the <Text style={styles.highlight}>Information Page of Nid Card Back Page</Text> in the frame
// //           </Text>
// //         </View>

// //         {/* Camera Frame Overlay */}
// //         <View style={styles.cameraContainer}>
// //           <View style={styles.cameraFrame}>
// //             <View style={styles.frameBorder}>
// //               {/* Corner Indicators */}
// //               <View style={[styles.corner, styles.cornerTopLeft]} />
// //               <View style={[styles.corner, styles.cornerTopRight]} />
// //               <View style={[styles.corner, styles.cornerBottomLeft]} />
// //               <View style={[styles.corner, styles.cornerBottomRight]} />
// //             </View>
// //           </View>
// //         </View>

// //         {/* Problem Link */}
// //         <TouchableOpacity style={styles.problemButton} onPress={handleProblem}>
// //           <Text style={styles.problemIcon}>❓</Text>
// //           <Text style={styles.problemText}>problem with scanning ?</Text>
// //         </TouchableOpacity>

// //         {/* Capture Button */}
// //         <View style={styles.captureContainer}>
// //           <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
// //             <View style={styles.captureButtonInner} />
// //           </TouchableOpacity>
// //         </View>
// //       </CameraView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //   },
// //   camera: {
// //     flex: 1,
// //   },
// //   loadingText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     marginTop: 100,
// //   },
// //   permissionContainer: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingHorizontal: 40,
// //   },
// //   permissionText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     textAlign: 'center',
// //     marginBottom: 24,
// //   },
// //   permissionButton: {
// //     backgroundColor: '#00A7E1',
// //     paddingVertical: 14,
// //     paddingHorizontal: 32,
// //     borderRadius: 24,
// //   },
// //   permissionButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingTop: 50,
// //     paddingBottom: 10,
// //   },
// //   backIcon: {
// //     color: '#fff',
// //     fontSize: 24,
// //   },
// //   headerRight: {
// //     flexDirection: 'row',
// //     gap: 20,
// //   },
// //   headerIcon: {
// //     fontSize: 20,
// //   },
// //   progressContainer: {
// //     flexDirection: 'row',
// //     gap: 8,
// //     paddingHorizontal: 20,
// //     marginBottom: 20,
// //   },
// //   progressBar: {
// //     flex: 1,
// //     height: 4,
// //     backgroundColor: 'rgba(255,255,255,0.3)',
// //     borderRadius: 2,
// //   },
// //   progressBarActive: {
// //     backgroundColor: '#fff',
// //   },
// //   instructions: {
// //     paddingHorizontal: 20,
// //     marginBottom: 30,
// //   },
// //   title: {
// //     fontSize: 18,
// //     color: '#fff',
// //     lineHeight: 26,
// //   },
// //   highlight: {
// //     color: '#00A7E1',
// //     fontWeight: '600',
// //   },
// //   cameraContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //   },
// //   cameraFrame: {
// //     width: '100%',
// //     aspectRatio: 1.5,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   frameBorder: {
// //     width: '90%',
// //     height: '70%',
// //     borderRadius: 12,
// //     borderWidth: 2,
// //     borderColor: '#fff',
// //     borderStyle: 'dashed',
// //     position: 'relative',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   corner: {
// //     position: 'absolute',
// //     width: 20,
// //     height: 20,
// //     borderColor: '#00A7E1',
// //     borderWidth: 3,
// //   },
// //   cornerTopLeft: {
// //     top: -2,
// //     left: -2,
// //     borderRightWidth: 0,
// //     borderBottomWidth: 0,
// //     borderTopLeftRadius: 8,
// //   },
// //   cornerTopRight: {
// //     top: -2,
// //     right: -2,
// //     borderLeftWidth: 0,
// //     borderBottomWidth: 0,
// //     borderTopRightRadius: 8,
// //   },
// //   cornerBottomLeft: {
// //     bottom: -2,
// //     left: -2,
// //     borderRightWidth: 0,
// //     borderTopWidth: 0,
// //     borderBottomLeftRadius: 8,
// //   },
// //   cornerBottomRight: {
// //     bottom: -2,
// //     right: -2,
// //     borderLeftWidth: 0,
// //     borderTopWidth: 0,
// //     borderBottomRightRadius: 8,
// //   },
// //   problemButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     gap: 8,
// //     paddingVertical: 12,
// //   },
// //   problemIcon: {
// //     fontSize: 16,
// //   },
// //   problemText: {
// //     color: '#fff',
// //     fontSize: 14,
// //   },
// //   captureContainer: {
// //     alignItems: 'center',
// //     paddingVertical: 30,
// //   },
// //   captureButton: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 35,
// //     backgroundColor: '#fff',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 4,
// //     borderColor: 'rgba(255,255,255,0.3)',
// //   },
// //   captureButtonInner: {
// //     width: 54,
// //     height: 54,
// //     borderRadius: 27,
// //     backgroundColor: '#fff',
// //   },
// // });



// // app/cleaner/verification/confirm-nid-front.jsx
// import { useLocalSearchParams } from 'expo-router';
// import { Image } from 'react-native';

// export default function ConfirmNidFront() {
//   const { photoUri } = useLocalSearchParams();

//   const handleConfirm = () => {
//     router.push('/cleaner/verification/scan-nid-back');
//   };

//   const handleRetake = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//         <View style={styles.progressBar} />
//         <View style={styles.progressBar} />
//       </View>

//       {/* ID Card Preview */}
//       <View style={styles.previewContainer}>
//         <View style={styles.idCard}>
//           {photoUri ? (
//             <Image 
//               source={{ uri: photoUri }} 
//               style={styles.capturedImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.idCardPlaceholder}>
//               <Text style={styles.placeholderIcon}>🪪</Text>
//               <Text style={styles.placeholderText}>NID Card Front</Text>
//             </View>
//           )}
//         </View>
//       </View>

//       {/* Validation Checklist */}
//       <View style={styles.checklistSection}>
//         <Text style={styles.checklistTitle}>After detected, you photo</Text>
        
//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>Readable, clear and not blurry</Text>
//         </View>

//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>Well-lit, not reflective, not too dark</Text>
//         </View>

//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>ID occupies most of the image</Text>
//         </View>

//         <Text style={styles.confirmTitle}>Please confirm that</Text>

//         <View style={styles.checklistItem}>
//           <Text style={styles.bulletPoint}>•</Text>
//           <Text style={styles.checkText}>ID is not expired</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
//           <Text style={styles.confirmButtonText}>Confirm</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
//           <Text style={styles.retakeButtonText}>Retake</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//   },
//   backIcon: {
//     fontSize: 24,
//     color: '#000',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: '#E5E5E5',
//     borderRadius: 2,
//   },
//   progressBarActive: {
//     backgroundColor: '#00A7E1',
//   },
//   previewContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   idCard: {
//     width: '100%',
//     aspectRatio: 1.6,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   capturedImage: {
//     width: '100%',
//     height: '100%',
//   },
//   idCardPlaceholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderIcon: {
//     fontSize: 60,
//     marginBottom: 10,
//   },
//   placeholderText: {
//     fontSize: 14,
//     color: '#999',
//   },
//   checklistSection: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   checklistTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 16,
//   },
//   checklistItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//     gap: 10,
//   },
//   checkIcon: {
//     fontSize: 16,
//     color: '#4CAF50',
//     marginTop: 2,
//   },
//   bulletPoint: {
//     fontSize: 16,
//     color: '#000',
//     marginTop: 2,
//   },
//   checkText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
//   confirmTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginTop: 20,
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//     gap: 12,
//   },
//   confirmButton: {
//     backgroundColor: '#00A7E1',
//     paddingVertical: 16,
//     borderRadius: 28,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   retakeButton: {
//     backgroundColor: 'transparent',
//     paddingVertical: 16,
//     borderRadius: 28,
//     alignItems: 'center',
//   },
//   retakeButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });





// // app/cleaner/verification/confirm-nid-back.jsx

// export default function ConfirmNidBack() {
//   const { photoUri } = useLocalSearchParams();

//   const handleConfirm = () => {
//     router.push('/cleaner/verification/facial-recognition');
//   };

//   const handleRetake = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//         <View style={styles.progressBar} />
//       </View>

//       {/* ID Card Preview */}
//       <View style={styles.previewContainer}>
//         <View style={styles.idCard}>
//           {photoUri ? (
//             <Image 
//               source={{ uri: photoUri }} 
//               style={styles.capturedImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.idCardPlaceholder}>
//               <Text style={styles.placeholderIcon}>🪪</Text>
//               <Text style={styles.placeholderText}>NID Card Back</Text>
//             </View>
//           )}
//         </View>
//       </View>

//       {/* Validation Checklist */}
//       <View style={styles.checklistSection}>
//         <Text style={styles.checklistTitle}>After detected, you photo</Text>
        
//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>Readable, clear and not blurry</Text>
//         </View>

//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>Well-lit, not reflective, not too dark</Text>
//         </View>

//         <View style={styles.checklistItem}>
//           <Text style={styles.checkIcon}>✓</Text>
//           <Text style={styles.checkText}>ID occupies most of the image</Text>
//         </View>

//         <Text style={styles.confirmTitle}>Please confirm that</Text>

//         <View style={styles.checklistItem}>
//           <Text style={styles.bulletPoint}>•</Text>
//           <Text style={styles.checkText}>ID is not expired</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
//           <Text style={styles.confirmButtonText}>Confirm</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
//           <Text style={styles.retakeButtonText}>Retake</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//   },
//   backIcon: {
//     fontSize: 24,
//     color: '#000',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: '#E5E5E5',
//     borderRadius: 2,
//   },
//   progressBarActive: {
//     backgroundColor: '#00A7E1',
//   },
//   previewContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   idCard: {
//     width: '100%',
//     aspectRatio: 1.6,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   capturedImage: {
//     width: '100%',
//     height: '100%',
//   },
//   idCardPlaceholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderIcon: {
//     fontSize: 60,
//     marginBottom: 10,
//   },
//   placeholderText: {
//     fontSize: 14,
//     color: '#999',
//   },
//   checklistSection: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   checklistTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 16,
//   },
//   checklistItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//     gap: 10,
//   },
//   checkIcon: {
//     fontSize: 16,
//     color: '#4CAF50',
//     marginTop: 2,
//   },
//   bulletPoint: {
//     fontSize: 16,
//     color: '#000',
//     marginTop: 2,
//   },
//   checkText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
//   confirmTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginTop: 20,
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//     gap: 12,
//   },
//   confirmButton: {
//     backgroundColor: '#00A7E1',
//     paddingVertical: 16,
//     borderRadius: 28,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   retakeButton: {
//     backgroundColor: 'transparent',
//     paddingVertical: 16,
//     borderRadius: 28,
//     alignItems: 'center',
//   },
//   retakeButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });





// // app/cleaner/verification/facial-recognition.jsx
// import { useEffect } from 'react';

// export default function FacialRecognition() {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [showCamera, setShowCamera] = useState(false);
//   const cameraRef = useRef(null);

//   const handleContinue = () => {
//     setShowCamera(true);
//   };

//   const handleCaptureFace = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       // Face captured, navigate to success
//       router.push('/cleaner/verification/verification-success');
//     }
//   };

//   // Auto-capture after 3 seconds when camera shows
//   useEffect(() => {
//     if (showCamera && permission?.granted) {
//       const timer = setTimeout(() => {
//         handleCaptureFace();
//       }, 3000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [showCamera]);

//   if (showCamera && permission?.granted) {
//     return (
//       <View style={styles.cameraContainer}>
//         <CameraView 
//           ref={cameraRef}
//           style={styles.camera}
//           facing="front"
//         >
//           {/* Header */}
//           <View style={styles.cameraHeader}>
//             <TouchableOpacity onPress={() => setShowCamera(false)}>
//               <Text style={styles.backIcon}>←</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Progress Bar */}
//           <View style={styles.progressContainer}>
//             <View style={[styles.progressBar, styles.progressBarActive]} />
//             <View style={[styles.progressBar, styles.progressBarActive]} />
//             <View style={[styles.progressBar, styles.progressBarActive]} />
//           </View>

//           {/* Face Overlay Circle */}
//           <View style={styles.faceOverlay}>
//             <View style={styles.faceCircleOuter}>
//               <View style={styles.faceCircleInner} />
//             </View>
//             <Text style={styles.instructionText}>Keep your face in the circle</Text>
//           </View>

//           {/* Manual Capture Button */}
//           <View style={styles.captureContainer}>
//             <TouchableOpacity style={styles.captureButton} onPress={handleCaptureFace}>
//               <View style={styles.captureButtonInner} />
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//         <View style={[styles.progressBar, styles.progressBarActive]} />
//       </View>

//       {/* Content */}
//       <View style={styles.content}>
//         {/* Face Icon */}
//         <View style={styles.faceContainer}>
//           <View style={styles.faceCircle}>
//             <View style={styles.face}>
//               <Text style={styles.faceEmoji}>👤</Text>
//             </View>
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>Facial recognition</Text>

//         {/* Description */}
//         <Text style={styles.description}>
//           In order to improve the success rate of face recognition, please follow these requirements below
//         </Text>

//         {/* Requirements List */}
//         <View style={styles.requirementsList}>
//           <View style={styles.requirementItem}>
//             <View style={styles.iconContainer}>
//               <Text style={styles.icon}>📱</Text>
//             </View>
//             <Text style={styles.requirementText}>Hold phone upright</Text>
//           </View>

//           <View style={styles.requirementItem}>
//             <View style={styles.iconContainer}>
//               <Text style={styles.icon}>💡</Text>
//             </View>
//             <Text style={styles.requirementText}>Well-lit</Text>
//           </View>

//           <View style={styles.requirementItem}>
//             <View style={styles.iconContainer}>
//               <Text style={styles.icon}>😊</Text>
//             </View>
//             <Text style={styles.requirementText}>Don't occluded face</Text>
//           </View>
//         </View>
//       </View>

//       {/* Continue Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.continueButtonText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   cameraContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraHeader: {
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//   },
//   backIcon: {
//     fontSize: 24,
//     color: '#000',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     paddingHorizontal: 20,
//     marginBottom: 40,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: '#E5E5E5',
//     borderRadius: 2,
//   },
//   progressBarActive: {
//     backgroundColor: '#00A7E1',
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   faceContainer: {
//     marginBottom: 30,
//   },
//   faceCircle: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     borderWidth: 4,
//     borderColor: '#00A7E1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#E8F8FD',
//   },
//   face: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   faceEmoji: {
//     fontSize: 60,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 40,
//     paddingHorizontal: 10,
//   },
//   requirementsList: {
//     width: '100%',
//     gap: 24,
//   },
//   requirementItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#E8F8FD',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     fontSize: 24,
//   },
//   requirementText: {
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//   },
//   buttonContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//   },
//   continueButton: {
//     backgroundColor: '#00A7E1',
//     paddingVertical: 16,
//     borderRadius: 28,
//     alignItems: 'center',
//   },
//   continueButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   faceOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   faceCircleOuter: {
//     width: 250,
//     height: 250,
//     borderRadius: 125,
//     borderWidth: 4,
//     borderColor: '#00A7E1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   faceCircleInner: {
//     width: 230,
//     height: 230,
//     borderRadius: 115,
//     borderWidth: 2,
//     borderColor: 'rgba(0, 167, 225, 0.5)',
//     borderStyle: 'dashed',
//   },
//   instructionText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   captureContainer: {
//     alignItems: 'center',
//     paddingVertical: 30,
//   },
//   captureButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   captureButtonInner: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     backgroundColor: '#fff',
//   },
// });



