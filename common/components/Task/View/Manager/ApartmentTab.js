import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Daily from '../../../Daily/Daily';
import Weekly from '../../../Weekly/Weekly';
import Monthly from '../../../Monthly/Monthly';

const ApartmentTab = createMaterialTopTabNavigator(
  {
    daily: Daily,
    weekly: Weekly,
    monthly: Monthly,
  },
  {
    lazy: true,
    swipeEnabled: true,
    swipe: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',

      indicatorStyle: {
        backgroundColor: 'yellow',
      },
      style: {
        backgroundColor: '#482114',
        elevation: 0,
      },
    },
  },
);
export default ApartmentTab;
