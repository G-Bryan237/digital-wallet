import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps, ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chevron, MayaAvatar, palette, Surface, WalletText } from '@/components/wallet-ui';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
type Row = { icon: IconName; title: string; value?: string };

const personal: Row[] = [
  { icon: 'account-edit-outline', title: 'Edit Profile' },
  { icon: 'phone-outline', title: 'Phone', value: '+1 (415) 555-0148' },
  { icon: 'email-outline', title: 'Email', value: 'maya.bennett@example.com' },
  { icon: 'map-marker-outline', title: 'Address', value: 'San Francisco, CA' },
];

const support: Row[] = [
  { icon: 'help-circle-outline', title: 'Help Center' },
  { icon: 'headset', title: 'Contact Us' },
  { icon: 'message-question-outline', title: 'FAQs' },
];

const settings: Row[] = [
  { icon: 'shield-star-outline', title: 'Security' },
  { icon: 'link-variant', title: 'Linked Accounts', value: '2 connected' },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <WalletText style={styles.title}>Profile</WalletText>
        <View style={styles.identity}>
          <MayaAvatar size={68} />
          <View style={styles.identityText}>
            <WalletText style={styles.name}>Maya Bennett</WalletText>
            <WalletText style={styles.contact}>maya.bennett@example.com</WalletText>
            <WalletText style={styles.contact}>+1 (415) 555-0148</WalletText>
          </View>
          <Pressable style={styles.editButton}>
            <WalletText style={styles.edit}>Edit</WalletText>
          </Pressable>
        </View>

        <Section title={'Personal Details'}>
          {personal.map((row, index) => (
            <ProfileRow divider={index < personal.length - 1} key={row.title} {...row} />
          ))}
        </Section>

        <Section title={'Preferences'}>
          <ProfileRow icon={'web'} title={'Language'} value={'English'} />
          <ProfileRow icon={'currency-usd'} title={'Currency'} value={'USD'} />
          <ProfileRow
            icon={'bell-outline'}
            title={'Notifications'}
            trailing={
              <Switch
                ios_backgroundColor={'#A8B2C3'}
                onValueChange={setNotifications}
                trackColor={{ false: '#A8B2C3', true: palette.blue }}
                value={notifications}
              />
            }
          />
          <ProfileRow
            divider={false}
            icon={'weather-night'}
            title={'Dark Mode'}
            trailing={
              <Switch
                ios_backgroundColor={'#A8B2C3'}
                onValueChange={setDarkMode}
                trackColor={{ false: '#A8B2C3', true: palette.blue }}
                value={darkMode}
              />
            }
          />
        </Section>

        <Section title={'Support'}>
          {support.map((row, index) => (
            <ProfileRow divider={index < support.length - 1} key={row.title} {...row} />
          ))}
        </Section>

        <Section title={'Settings'}>
          {settings.map((row, index) => (
            <ProfileRow divider={index < settings.length - 1} key={row.title} {...row} />
          ))}
        </Section>
        <WalletText style={styles.version}>Version 1.0.0</WalletText>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <WalletText style={styles.sectionTitle}>{title}</WalletText>
      <Surface style={styles.sectionCard}>{children}</Surface>
    </View>
  );
}

function ProfileRow({
  icon,
  title,
  value,
  trailing,
  divider = true,
}: Row & { trailing?: ReactNode; divider?: boolean }) {
  return (
    <Pressable style={[styles.row, divider && styles.rowDivider]}>
      <MaterialCommunityIcons color={'#263452'} name={icon} size={23} />
      <WalletText style={styles.rowTitle}>{title}</WalletText>
      {value ? (
        <WalletText numberOfLines={1} style={styles.rowValue}>
          {value}
        </WalletText>
      ) : null}
      {trailing ?? <Chevron />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: palette.background, flex: 1 },
  content: { paddingBottom: 5, paddingHorizontal: 19 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.5, paddingTop: 7 },
  identity: { alignItems: 'center', flexDirection: 'row', paddingBottom: 12, paddingTop: 15 },
  identityText: { flex: 1, marginLeft: 16 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  contact: { color: palette.muted, fontSize: 12, marginTop: 2 },
  editButton: {
    alignItems: 'center',
    borderColor: palette.blue,
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  edit: { color: palette.blue, fontSize: 15, fontWeight: '500' },
  section: { marginTop: 5 },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8, marginLeft: 2 },
  sectionCard: { overflow: 'hidden' },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 41,
    paddingLeft: 15,
    paddingRight: 8,
  },
  rowDivider: {
    borderBottomColor: palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowTitle: { flex: 1, fontSize: 14, marginLeft: 14 },
  rowValue: { color: palette.muted, fontSize: 12, marginLeft: 6, maxWidth: '58%' },
  version: { color: palette.muted, fontSize: 10, marginTop: 4, textAlign: 'center' },
});
