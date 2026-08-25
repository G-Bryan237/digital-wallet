import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Chevron,
  IconBubble,
  MayaAvatar,
  palette,
  Surface,
  WalletText,
} from '@/components/wallet-ui';

const recent = [
  {
    title: 'Whole Foods',
    detail: 'Groceries  •  Aug 25',
    amount: '-$86.40',
    icon: 'basket-outline',
    color: '#2FAE41',
    tint: '#ECF9E9',
  },
  {
    title: 'Salary Deposit',
    detail: 'Income  •  Aug 24',
    amount: '+$3,200.00',
    icon: 'bank-outline',
    color: '#099B7D',
    tint: '#E6F8F3',
  },
  {
    title: 'Netflix',
    detail: 'Entertainment  •  Aug 23',
    amount: '-$15.49',
    icon: 'movie-open-outline',
    color: '#6845CC',
    tint: '#F1EDFF',
  },
  {
    title: 'Uber',
    detail: 'Transport  •  Aug 22',
    amount: '-$24.80',
    icon: 'car-outline',
    color: '#B68710',
    tint: '#FFF6DF',
  },
  {
    title: 'Transfer from Daniel',
    detail: 'Transfer  •  Aug 21',
    amount: '+$125.00',
    icon: 'swap-horizontal',
    color: '#347BA2',
    tint: '#E8F5FC',
  },
] as const;

const actions = [
  { title: 'Send', icon: 'arrow-top-right' },
  { title: 'Request', icon: 'arrow-bottom-left' },
  { title: 'Top Up', icon: 'plus' },
  { title: 'Scan & Pay', icon: 'line-scan' },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MayaAvatar size={48} />
          <View style={styles.greeting}>
            <WalletText style={styles.greetingTitle}>Good morning, Maya</WalletText>
            <WalletText style={styles.welcome}>Welcome back</WalletText>
          </View>
          <Pressable accessibilityLabel={'Notifications'} style={styles.notification}>
            <MaterialCommunityIcons color={'#596274'} name={'bell-outline'} size={26} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <WalletText style={styles.balanceLabel}>Total balance</WalletText>
          <View style={styles.balanceRow}>
            <WalletText style={styles.balance}>$8,420.50</WalletText>
            <MaterialCommunityIcons color={'#FFFFFF'} name={'eye-outline'} size={27} />
          </View>
          <View style={styles.cardFooter}>
            <WalletText style={styles.cardDigits}>•••• 5824</WalletText>
            <View style={styles.currencyPill}>
              <WalletText style={styles.currency}>USD</WalletText>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          {actions.map((action) => (
            <Pressable key={action.title} style={styles.action}>
              <View style={styles.actionCircle}>
                <MaterialCommunityIcons color={palette.blue} name={action.icon} size={28} />
              </View>
              <WalletText style={styles.actionLabel}>{action.title}</WalletText>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <WalletText style={styles.sectionTitle}>Recent Transactions</WalletText>
          <Pressable onPress={() => router.push('/transactions')}>
            <WalletText style={styles.seeAll}>See All</WalletText>
          </Pressable>
        </View>
        <Surface style={styles.transactionList}>
          {recent.map((item, index) => (
            <Pressable
              key={item.title}
              style={[styles.transactionRow, index < recent.length - 1 && styles.rowBorder]}>
              <IconBubble
                backgroundColor={item.tint}
                color={item.color}
                name={item.icon}
              />
              <View style={styles.transactionText}>
                <WalletText numberOfLines={1} style={styles.transactionTitle}>
                  {item.title}
                </WalletText>
                <WalletText style={styles.transactionDetail}>{item.detail}</WalletText>
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
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: palette.background, flex: 1 },
  content: { paddingBottom: 16, paddingHorizontal: 16 },
  header: { alignItems: 'center', flexDirection: 'row', paddingBottom: 16, paddingTop: 9 },
  greeting: { flex: 1, marginLeft: 12 },
  greetingTitle: { fontSize: 17, fontWeight: '600' },
  welcome: { color: palette.muted, fontSize: 14, marginTop: 2 },
  notification: { alignItems: 'center', height: 36, justifyContent: 'center', width: 36 },
  notificationDot: {
    backgroundColor: palette.blue,
    borderColor: palette.background,
    borderRadius: 4,
    borderWidth: 2,
    height: 8,
    position: 'absolute',
    right: 1,
    top: 0,
    width: 8,
  },
  balanceCard: {
    backgroundColor: '#071536',
    borderRadius: 19,
    height: 178,
    justifyContent: 'space-between',
    padding: 22,
  },
  balanceLabel: { color: '#F0F3FC', fontSize: 16 },
  balanceRow: { alignItems: 'center', flexDirection: 'row', gap: 16 },
  balance: { color: '#FFFFFF', fontSize: 40, fontWeight: '400', letterSpacing: 0.4 },
  cardFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  cardDigits: { color: '#F2F4FA', fontSize: 15, letterSpacing: 1 },
  currencyPill: {
    backgroundColor: palette.blue,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  currency: { color: '#FFFFFF', fontSize: 14 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 19,
  },
  action: { alignItems: 'center', width: 76 },
  actionCircle: {
    alignItems: 'center',
    backgroundColor: '#E9F0FF',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  sectionTitle: { fontSize: 19, fontWeight: '600' },
  seeAll: { color: palette.blue, fontSize: 16, fontWeight: '500' },
  transactionList: { overflow: 'hidden' },
  transactionRow: { alignItems: 'center', flexDirection: 'row', minHeight: 62, paddingHorizontal: 12 },
  rowBorder: { borderBottomColor: palette.border, borderBottomWidth: StyleSheet.hairlineWidth },
  transactionText: { flex: 1, marginLeft: 12 },
  transactionTitle: { fontSize: 15, fontWeight: '600' },
  transactionDetail: { color: palette.muted, fontSize: 12, marginTop: 3 },
  amount: { fontSize: 15, fontWeight: '600', marginLeft: 8 },
});
