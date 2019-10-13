import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import DailyTask from '../DailyTask/DailyTask';
import WeeklyTask from '../WeeklyTask/WeeklyTask';
import MonthlyTask from '../MonthlyTask/MonthlyTask';

const ApartmentTab = createMaterialTopTabNavigator(
  {
    daily: DailyTask,
    weekly: WeeklyTask,
    monthly: MonthlyTask,
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
