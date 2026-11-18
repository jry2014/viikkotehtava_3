import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderProps,
  StackScreenProps,
} from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  Appbar,
  Button,
  Menu,
  PaperProvider,
  Text,
} from 'react-native-paper';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: StackHeaderProps) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => setMenuVisible(false)}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => setMenuVisible(false)}
            title="Option 2"
          />
          <Menu.Item title="Option 3" disabled />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home Screen</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Details')}
        style={styles.button}
      >
        Go to details
      </Button>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Details Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});
