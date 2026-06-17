import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/NotificationScreen";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createNativeStackNavigator();

const HomeTabScreens = () => {
    return(
        <HomeStack.Navigator
            screenOptions={{
             headerShown: false,
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} />

            {/* set budget screen */}

            {/* set category screen */}

            {/* all categories screens  */}
        </HomeStack.Navigator>
    )
}

export default HomeTabScreens;
