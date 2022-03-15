import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

export default function StravaLogin() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '76862',
      scopes: ['activity:read_all'],
      redirectUri: "exp://127.0.0.1:19000"
        
      // "https://auth.expo.io/@maxbwee/urheilukelloappi-f6442c7e-a019-413d-bf06-219cb11f1b1a"
      
      
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}