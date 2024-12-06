import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  BackHandler,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';
const HomeScreen = ({navigation}) => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBackPress = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}> 
        <WebView
          ref={webViewRef}
          source={{uri: 'https://testcase.myideasoft.com/'}}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
        />

        {canGoBack && (
          <Button
            title="Geri Git"
            onPress={() => webViewRef.current.goBack()}
          />
        )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
export default HomeScreen;
