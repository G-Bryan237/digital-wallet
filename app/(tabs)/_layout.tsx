import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { palette } from '@/components/wallet-ui';

const TAB_ICONS = {
  index: { active: 'home-variant', inactive: 'home-variant-outline' },
  transactions: { active: 'swap-horizontal-bold', inactive: 'swap-horizontal' },
  cards: { active: 'credit-card', inactive: 'credit-card-outline' },
  profile: { active: 'account', inactive: 'account-outline' },
} as const;

function TabIcon({
  route,
  focused,
  color,
}: {
  route: keyof typeof TAB_ICONS;
  focused: boolean;
  color: string;
}) {
  const icon = TAB_ICONS[route][focused ? 'active' : 'inactive'];
  if (route === 'transactions') {
    return (
      <View style={[styles.transactionIcon, { borderColor: color }]}>
        <MaterialCommunityIcons color={color} name={icon} size={19} />
      </View>
    );
  }
  return <MaterialCommunityIcons color={color} name={icon} size={27} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: palette.background },
        tabBarActiveBackgroundColor: palette.blueSoft,
        tabBarActiveTintColor: palette.blue,
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: '#687284',
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name={'index'}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} route={'index'} />
          ),
        }}
      />
      <Tabs.Screen
        name={'transactions'}
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} route={'transactions'} />
          ),
        }}
      />
      <Tabs.Screen
        name={'cards'}
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} route={'cards'} />
          ),
        }}
      />
      <Tabs.Screen
        name={'profile'}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} route={'profile'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#ECEEF3',
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
    height: Platform.select({ ios: 82, android: 72, default: 76 }),
    paddingBottom: Platform.select({ ios: 7, android: 6, default: 6 }),
    paddingHorizontal: 12,
    paddingTop: 7,
    shadowOpacity: 0,
  },
  tabItem: {
    borderRadius: 12,
    marginHorizontal: 3,
    overflow: 'hidden',
    paddingVertical: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  transactionIcon: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.7,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
});
