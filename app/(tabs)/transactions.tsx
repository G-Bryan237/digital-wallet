import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chevron, IconBubble, palette, WalletText } from '@/components/wallet-ui';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
type Transaction = {
  title: string;
  detail: string;
  amount: string;
  icon: IconName;
  color: string;
  tint: string;
};

const groups: { title: string; items: Transaction[] }[] = [
  {
    title: 'Today',
    items: [
      {
        title: 'Coffee House',
        detail: 'Food & drink  •  9:42 AM',
        amount: '-$6.80',
        icon: 'coffee-outline',
        color: '#E56D18',
        tint: '#FFF0E6',
      },
      {
        title: 'Transfer from Maya',
        detail: 'Transfer  •  8:15 AM',
        amount: '+$125.00',
        icon: 'swap-horizontal',
        color: '#0C9C8D',
        tint: '#E5F8F5',
      },
      {
        title: 'Pharmacy',
        detail: 'Health  •  7:30 AM',
        amount: '-$18.25',
        icon: 'medical-bag',
        color: '#7046D1',
        tint: '#F1ECFF',
      },
    ],
  },
  {
    title: 'Yesterday',
    items: [
      { title: 'Electricity Bill', detail: 'Bills  •  6:10 PM', amount: '-$74.20', icon: 'lightbulb-outline', color: '#B88B13', tint: '#FFF6DF' },
      { title: 'Online Store', detail: 'Shopping  •  2:45 PM', amount: '-$52.99', icon: 'shopping-outline', color: '#D53B82', tint: '#FFE8F2' },
      { title: 'Transfer to Daniel', detail: 'Transfer  •  11:20 AM', amount: '-$200.00', icon: 'swap-horizontal', color: '#347BA2', tint: '#E8F5FC' },
      { title: 'Freelance Payment', detail: 'Income  •  9:05 AM', amount: '+$780.00', icon: 'wallet-outline', color: '#0C9C79', tint: '#E6FAF3' },
    ],
  },
  {
    title: 'Last Week',
    items: [
      { title: 'Grocery Market', detail: 'Groceries  •  Aug 19', amount: '-$86.40', icon: 'basket-outline', color: '#2FAE41', tint: '#ECF9E9' },
      { title: 'Metro Pass', detail: 'Transport  •  Aug 18', amount: '-$32.00', icon: 'train', color: '#B68710', tint: '#FFF6DF' },
      { title: 'Cloud Storage', detail: 'Subscription  •  Aug 17', amount: '-$9.99', icon: 'cloud-outline', color: '#7844C9', tint: '#F1EDFF' },
      { title: 'Cashback Reward', detail: 'Reward  •  Aug 16', amount: '+$12.50', icon: 'gift-outline', color: '#0D9C7D', tint: '#E5F8F3' },
    ],
  },
];

const filters = ['Date', 'Category', 'Type', 'Amount'];

export default function TransactionsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <WalletText style={styles.title}>Transactions</WalletText>
          <View style={styles.searchButton}>
            <MaterialCommunityIcons color={'#6F7888'} name={'magnify'} size={25} />
          </View>
        </View>
        <View style={styles.search}>
          <MaterialCommunityIcons color={'#758093'} name={'magnify'} size={24} />
          <TextInput
            accessibilityLabel={'Search transactions'}
            placeholder={'Search transactions'}
            placeholderTextColor={'#9299A9'}
            style={styles.searchInput}
          />
          <MaterialCommunityIcons color={'#687385'} name={'tune-variant'} size={24} />
        </View>
        <View style={styles.filters}>
          {filters.map((filter) => (
            <Pressable key={filter} style={styles.filter}>
              <WalletText style={styles.filterText}>{filter}</WalletText>
              <MaterialCommunityIcons color={'#697386'} name={'chevron-down'} size={18} />
            </Pressable>
          ))}
        </View>

        {groups.map((group) => (
          <View key={group.title}>
            <WalletText style={styles.groupTitle}>{group.title}</WalletText>
            {group.items.map((item) => (
              <Pressable key={item.title} style={styles.row}>
                <IconBubble
                  backgroundColor={item.tint}
                  color={item.color}
                  iconSize={21}
                  name={item.icon}
                  size={39}
                />
                <View style={styles.rowText}>
                  <WalletText style={styles.rowTitle}>{item.title}</WalletText>
                  <WalletText style={styles.rowDetail}>{item.detail}</WalletText>
                </View>
                <WalletText
                  style={[
                    styles.amount,
                    { color: item.amount.startsWith('+') ? palette.green : palette.red },
                  ]}>
                  {item.amount}
                </WalletText>
                <Chevron />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: palette.background, flex: 1 },
  content: { paddingBottom: 10, paddingHorizontal: 18 },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
    paddingTop: 7,
  },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.5 },
  searchButton: {
    alignItems: 'center',
    borderColor: palette.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 43,
    justifyContent: 'center',
    width: 43,
  },
  search: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: palette.border,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    height: 47,
    paddingHorizontal: 12,
  },
  searchInput: { color: palette.navy, flex: 1, fontSize: 14, marginHorizontal: 9, padding: 0 },
  filters: { flexDirection: 'row', gap: 9, marginBottom: 16, marginTop: 12 },
  filter: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: palette.border,
    borderRadius: 9,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  filterText: { fontSize: 12, marginRight: 5 },
  groupTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2, marginTop: 4 },
  row: {
    alignItems: 'center',
    borderBottomColor: palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 55,
  },
  rowText: { flex: 1, marginLeft: 10 },
  rowTitle: { fontSize: 14, fontWeight: '600' },
  rowDetail: { color: palette.muted, fontSize: 11.5, marginTop: 2 },
  amount: { fontSize: 14, fontWeight: '600', marginLeft: 6 },
});
