import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeStack from './homeStack';
import AboutStack from './aboutStack';

const DrawerNavigationStack = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    About: {
        screen: AboutStack
    }
})
export default createAppContainer(DrawerNavigationStack);