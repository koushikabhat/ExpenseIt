import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryListScreen from "../screens/CategoryListScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import AddScreen from "../screens/AddScreen";
import OverviewScreen from "../screens/OverviewScreen";

const OverviewStack = createNativeStackNavigator();

const OverViewTab = () => {
    return(
        <OverviewStack.Navigator
            screenOptions={{
             headerShown: false,
            }}
            initialRouteName="OverviewScreen"
        >
            <OverviewStack.Screen name="OverviewScreen" component={OverviewScreen} />
            <OverviewStack.Screen name="CategoryListScreen" component={CategoryListScreen} />
            <OverviewStack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
            <OverviewStack.Screen name="AddScreen" component={AddScreen} />

            {/* set budget screen */}

            {/* set category screen */}

            {/* all categories screens  */}
        </OverviewStack.Navigator>
    )
}

export default OverViewTab;
