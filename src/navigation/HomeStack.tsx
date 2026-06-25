import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/NotificationScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoryListScreen from "../screens/CategoryListScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import AddScreen from "../screens/AddScreen";

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
            
            <HomeStack.Screen name="CategoryListScreen" component={CategoryListScreen} />
            <HomeStack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
            <HomeStack.Screen name="AddScreen" component={AddScreen} />

            {/* set budget screen */}

            {/* set category screen */}

            {/* all categories screens  */}
        </HomeStack.Navigator>
    )
}

export default HomeTabScreens;
