import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Chevron, palette, Surface, WalletText } from '@/components/wallet-ui';

function WalletSwitch({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <Switch
      ios_backgroundColor={'#A8B2C3'}
      onValueChange={onValueChange}
      trackColor={{ false: '#A8B2C3', true: palette.blue }}
      value={value}
    />
  );
}

export default function CardsScreen() {
  const [frozen, setFrozen] = useState(true);
  const [online, setOnline] = useState(true);
  const [atm, setAtm] = useState(false);
  const [contactless, setContactless] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipProgress = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flipProgress.value, [0, 1], [0, 180])}deg` },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flipProgress.value, [0, 1], [180, 360])}deg` },
    ],
  }));

  const handleCardPress = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    flipProgress.value = withTiming(nextFlipped ? 1 : 0, {
      duration: 540,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <WalletText style={styles.title}>My Cards</WalletText>
          <Pressable accessibilityLabel={'Add card'} style={styles.addButton}>
            <MaterialCommunityIcons color={palette.blue} name={'plus'} size={29} />
          </Pressable>
        </View>
        <Pressable
          accessibilityHint={'Double tap to show the other side'}
          accessibilityLabel={isFlipped ? 'Back of virtual card' : 'Front of virtual card'}
          accessibilityRole={'button'}
          onPress={handleCardPress}
          style={styles.cardPressable}>
          <Animated.View style={[styles.card, styles.cardFace, frontAnimatedStyle]}>
          <View style={styles.cardGlowA} />
          <View style={styles.cardGlowB} />
          <View style={styles.cardTop}>
            <WalletText style={styles.virtual}>VIRTUAL</WalletText>
            <MaterialCommunityIcons color={'#FFFFFF'} name={'contactless-payment'} size={29} />
          </View>
          <MaterialCommunityIcons color={'#FFFFFF'} name={'credit-card-chip-outline'} size={45} />
          <WalletText style={styles.cardNumber}>••••  ••••  ••••  5824</WalletText>
          <View style={styles.cardBottom}>
            <View style={styles.cardHolder}>
              <WalletText style={styles.cardCaption}>CARDHOLDER</WalletText>
              <WalletText style={styles.cardValue}>MAYA BENNETT</WalletText>
            </View>
            <View>
              <WalletText style={styles.cardCaption}>EXPIRES</WalletText>
              <WalletText style={styles.cardValue}>09/29</WalletText>
            </View>
            <View style={styles.mastercard}>
              <View style={styles.masterCircle} />
              <View style={[styles.masterCircle, styles.masterCircleRight]} />
            </View>
          </View>
          </Animated.View>

          <Animated.View style={[styles.card, styles.cardFace, backAnimatedStyle]}>
            <View style={styles.cardGlowA} />
            <View style={styles.cardGlowB} />
            <View style={styles.backTop}>
              <WalletText style={styles.virtual}>DIGITAL WALLET</WalletText>
              <MaterialCommunityIcons color={'#FFFFFF'} name={'contactless-payment'} size={29} />
            </View>
            <View style={styles.magneticStripe} />
            <View style={styles.signaturePanel}>
              <View style={styles.signatureText}>
                <WalletText style={styles.backCaption}>CARDHOLDER</WalletText>
                <WalletText style={styles.backName}>MAYA BENNETT</WalletText>
              </View>
              <View style={styles.cvv}>
                <WalletText style={styles.cvvLabel}>CVV</WalletText>
                <WalletText style={styles.cvvValue}>482</WalletText>
              </View>
            </View>
            <View style={styles.backFooter}>
              <WalletText style={styles.backHint}>Tap to return to card front</WalletText>
              <MaterialCommunityIcons color={'#FFFFFF'} name={'rotate-3d-variant'} size={21} />
            </View>
          </Animated.View>
        </Pressable>

        <Surface style={styles.freezeCard}>
          <View style={styles.freezeIcon}>
            <MaterialCommunityIcons color={'#173A79'} name={'lock-outline'} size={31} />
            <MaterialCommunityIcons
              color={'#173A79'}
              name={'snowflake'}
              size={13}
              style={styles.freezeSnowflake}
            />
          </View>
          <View style={styles.controlText}>
            <WalletText style={styles.controlTitle}>Freeze card</WalletText>
            <WalletText style={styles.controlDetail}>Card is temporarily locked</WalletText>
          </View>
          <WalletSwitch onValueChange={setFrozen} value={frozen} />
        </Surface>

        <WalletText style={styles.sectionTitle}>Monthly spending limit</WalletText>
        <Surface style={styles.spending}>
          <View style={styles.spendingTop}>
            <WalletText style={styles.used}>
              $1,250 <WalletText style={styles.usedSuffix}>used</WalletText>
            </WalletText>
            <WalletText style={styles.limit}>$2,000 limit</WalletText>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progress} />
          </View>
          <View style={styles.spendingBottom}>
            <WalletText style={styles.remaining}>$750 remaining</WalletText>
            <Pressable>
              <WalletText style={styles.editLimit}>Edit limit</WalletText>
            </Pressable>
          </View>
        </Surface>

        <WalletText style={styles.sectionTitle}>Card controls</WalletText>
        <Surface style={styles.controls}>
          <ControlRow
            detail={'Pay securely on websites'}
            icon={'web'}
            onValueChange={setOnline}
            title={'Online payments'}
            value={online}
          />
          <ControlRow
            detail={'Withdraw cash at ATMs'}
            icon={'cash-marker'}
            onValueChange={setAtm}
            title={'ATM withdrawals'}
            value={atm}
          />
          <ControlRow
            detail={'Tap to pay in stores'}
            icon={'contactless-payment'}
            onValueChange={setContactless}
            title={'Contactless'}
            value={contactless}
          />
          <Pressable style={styles.detailsLink}>
            <WalletText style={styles.editLimit}>View card details</WalletText>
            <Chevron />
          </Pressable>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

function ControlRow({
  icon,
  title,
  detail,
  value,
  onValueChange,
}: {
  icon: 'web' | 'cash-marker' | 'contactless-payment';
  title: string;
  detail: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.controlRow}>
      <MaterialCommunityIcons color={'#24417B'} name={icon} size={27} />
      <View style={styles.controlText}>
        <WalletText style={styles.controlTitle}>{title}</WalletText>
        <WalletText style={styles.controlDetail}>{detail}</WalletText>
      </View>
      <WalletSwitch onValueChange={onValueChange} value={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: palette.background, flex: 1 },
  content: { paddingBottom: 14, paddingHorizontal: 17 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14, paddingTop: 7 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.5 },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: palette.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  cardPressable: {
    height: 224,
  },
  card: {
    backgroundColor: '#071A52',
    borderRadius: 18,
    height: 224,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 24,
  },
  cardFace: {
    backfaceVisibility: 'hidden',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  cardGlowA: {
    backgroundColor: '#063DBD',
    height: 330,
    opacity: 0.72,
    position: 'absolute',
    right: 28,
    top: -110,
    transform: [{ rotate: '20deg' }],
    width: 150,
  },
  cardGlowB: {
    backgroundColor: '#0CD4B3',
    borderRadius: 150,
    height: 260,
    opacity: 0.78,
    position: 'absolute',
    right: -105,
    top: -4,
    width: 260,
  },
  cardTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  virtual: { color: '#FFFFFF', fontSize: 11, letterSpacing: 1.6 },
  cardNumber: { color: '#FFFFFF', fontSize: 23, letterSpacing: 2.3 },
  cardBottom: { alignItems: 'flex-end', flexDirection: 'row' },
  cardHolder: { flex: 1 },
  cardCaption: { color: '#DCE6FF', fontSize: 9, marginBottom: 5 },
  cardValue: { color: '#FFFFFF', fontSize: 14, letterSpacing: 0.4 },
  mastercard: { height: 39, marginLeft: 25, width: 60 },
  masterCircle: {
    borderColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1.7,
    height: 38,
    position: 'absolute',
    width: 38,
  },
  masterCircleRight: { left: 22 },
  backTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  magneticStripe: {
    backgroundColor: 'rgba(2, 8, 26, 0.78)',
    height: 44,
    marginHorizontal: -24,
  },
  signaturePanel: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 8,
    flexDirection: 'row',
    minHeight: 61,
    paddingHorizontal: 14,
  },
  signatureText: { flex: 1 },
  backCaption: { color: '#5E6880', fontSize: 9, letterSpacing: 0.8, marginBottom: 5 },
  backName: { color: '#091534', fontSize: 17, fontWeight: '700', letterSpacing: 0.8 },
  cvv: {
    alignItems: 'center',
    borderLeftColor: '#D9DDEA',
    borderLeftWidth: 1,
    minWidth: 57,
    paddingLeft: 12,
  },
  cvvLabel: { color: '#70798C', fontSize: 8, letterSpacing: 0.7 },
  cvvValue: { color: '#091534', fontSize: 15, fontWeight: '700', marginTop: 3 },
  backFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backHint: { color: '#E2E9FA', fontSize: 10, marginRight: 7 },
  freezeCard: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 19,
    minHeight: 70,
    paddingHorizontal: 17,
  },
  freezeIcon: { height: 36, justifyContent: 'center', width: 34 },
  freezeSnowflake: { bottom: 0, position: 'absolute', right: -2 },
  controlText: { flex: 1, marginLeft: 15 },
  controlTitle: { fontSize: 15, fontWeight: '600' },
  controlDetail: { color: palette.muted, fontSize: 12, marginTop: 3 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 9, marginTop: 20 },
  spending: { padding: 17 },
  spendingTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  used: { fontSize: 18, fontWeight: '700' },
  usedSuffix: { fontSize: 13, fontWeight: '400' },
  limit: { color: palette.muted, fontSize: 13 },
  progressTrack: {
    backgroundColor: '#EAECF2',
    borderRadius: 3,
    height: 7,
    marginVertical: 11,
    overflow: 'hidden',
  },
  progress: { backgroundColor: palette.blue, height: '100%', width: '63%' },
  spendingBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  remaining: { color: palette.muted, fontSize: 13 },
  editLimit: { color: palette.blue, fontSize: 13, fontWeight: '500' },
  controls: { overflow: 'hidden' },
  controlRow: {
    alignItems: 'center',
    borderBottomColor: palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 62,
    paddingHorizontal: 17,
  },
  detailsLink: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 47,
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 8,
  },
});
