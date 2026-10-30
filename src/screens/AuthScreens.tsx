import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Body, Chip, PrimaryButton, Screen, Title } from '../components/ui';
import BackIcon from '../../assets/figma/meeting-open/back.svg';
import CameraIcon from '../../assets/figma/onboarding-name/asset-3.svg';
import CoffeeIcon from '../../assets/figma/onboarding-interests/asset-3.svg';
import GamesIcon from '../../assets/figma/onboarding-interests/asset-4.svg';

type Props<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

function AuthHeader({ onBack, step }: { onBack: () => void; step?: number }) {
  return (
    <View className="mb-6">
      <View className="h-16 flex-row items-center justify-between">
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} className="h-10 w-10 items-center justify-center rounded-full bg-white"><BackIcon /></Pressable>
        {step ? <Text className="font-medium text-xs text-muted">Шаг {step} из 3</Text> : <Text className="font-bold text-2xl text-ink">авантюра*</Text>}
      </View>
      {step ? <View className="mt-4 flex-row gap-2">{[1, 2, 3].map((index) => <View key={index} className={`h-1 flex-1 rounded-full ${index <= step ? 'bg-lime' : 'bg-line'}`} />)}</View> : null}
    </View>
  );
}

function Field({ label, value, onChangeText, hint, secureTextEntry, multiline, maxLength }: { label: string; value: string; onChangeText: (value: string) => void; hint?: string; secureTextEntry?: boolean; multiline?: boolean; maxLength?: number }) {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between"><Text className="font-semibold text-[11px] text-muted">{label}</Text>{maxLength ? <Text className="font-sans text-[11px] text-muted">{value.length}/{maxLength}</Text> : null}</View>
      <TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} multiline={multiline} maxLength={maxLength} textAlignVertical={multiline ? 'top' : 'center'} className={`rounded-input border border-line bg-white px-4 font-sans text-sm text-ink ${multiline ? 'h-40 py-4' : 'h-12'}`} />
      {hint ? <Text className="font-sans text-[11px] leading-[15px] text-muted">{hint}</Text> : null}
    </View>
  );
}

export function RegisterScreen({ navigation }: Props<'Register'>) {
  const [email, setEmail] = useState('sasha@mail.ru');
  const [password, setPassword] = useState('adventure12');
  const [error, setError] = useState('');
  const submit = () => {
    if (!email.includes('@') || password.length < 8) { setError('Укажите почту и пароль не короче 8 символов'); return; }
    navigation.navigate('OnboardingName');
  };
  return <Screen><View className="flex-1 px-6 pb-6"><AuthHeader onBack={() => navigation.navigate('Login')} /><Title>Начнём авантюру?</Title><Body className="mt-2">Создайте аккаунт, чтобы находить встречи и своих людей рядом.</Body><View className="mt-8 gap-6"><Field label="Электронная почта" value={email} onChangeText={setEmail} /><Field label="Пароль" value={password} onChangeText={setPassword} secureTextEntry hint="Не менее 8 символов" /></View>{error ? <Text className="mt-2 text-xs text-rust">{error}</Text> : null}<View className="mt-8 gap-4"><PrimaryButton label="Создать аккаунт" onPress={submit} /><Pressable accessibilityRole="button" onPress={() => navigation.navigate('Login')}><Text className="text-center font-sans text-xs text-muted">Уже есть аккаунт? <Text className="font-semibold text-green">Войти</Text></Text></Pressable></View><View className="flex-1" /><Text className="text-center font-sans text-[11px] leading-[17px] text-muted">Создавая аккаунт, вы принимаете <Text className="text-green">условия использования</Text> и <Text className="text-green">политику конфиденциальности</Text>.</Text></View></Screen>;
}

export function LoginScreen({ navigation }: Props<'Login'>) {
  const [email, setEmail] = useState('sasha@mail.ru');
  const [password, setPassword] = useState('adventure12');
  const [error, setError] = useState('');
  const submit = () => {
    if (!email.includes('@') || !password) { setError('Укажите почту и пароль'); return; }
    navigation.replace('Main');
  };
  return <Screen><View className="flex-1 px-6 pb-6"><AuthHeader onBack={() => navigation.navigate('Register')} /><Title>С возвращением!</Title><Body className="mt-2">Ваши встречи и разговоры уже ждут. Продолжим?</Body><View className="mt-8 gap-6"><Field label="Электронная почта" value={email} onChangeText={setEmail} /><Field label="Пароль" value={password} onChangeText={setPassword} secureTextEntry /></View><Pressable accessibilityRole="button" onPress={() => setError('Восстановление пароля появится после подключения API')} className="mt-6"><Text className="text-right font-semibold text-xs text-green">Забыли пароль?</Text></Pressable>{error ? <Text className="mt-2 text-xs text-rust">{error}</Text> : null}<View className="mt-8"><PrimaryButton label="Войти" onPress={submit} /></View><View className="flex-1" /><Pressable accessibilityRole="button" onPress={() => navigation.navigate('Register')}><Text className="text-center font-sans text-xs text-muted">Ещё нет аккаунта? <Text className="font-semibold text-green">Создать аккаунт</Text></Text></Pressable></View></Screen>;
}

export function OnboardingNameScreen({ navigation }: Props<'OnboardingName'>) {
  const [name, setName] = useState('Саша');
  return <Screen><View className="flex-1 px-6"><AuthHeader step={1} onBack={() => navigation.goBack()} /><Title>Давайте знакомиться</Title><Body className="mt-2">Добавьте фото и имя — так вас будет проще узнать на встрече.</Body><View className="mt-8 flex-row items-center gap-6"><View className="h-24 w-24"><Image source={require('../../assets/figma/onboarding-name/asset.jpg')} className="!h-24 !w-24 rounded-full" /><View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-lime"><CameraIcon /></View></View><View className="flex-1 gap-2"><Text className="font-semibold text-sm text-green">Изменить фото</Text><Body className="text-xs">Лучше всего подойдёт фото, на котором видно лицо.</Body></View></View><View className="mt-8"><Field label="Как к вам обращаться" value={name} onChangeText={setName} hint="Это имя увидят другие участники встреч" /></View><View className="flex-1" /><View className="pb-4"><PrimaryButton label="Продолжить" onPress={() => name.trim() && navigation.navigate('OnboardingBio')} disabled={!name.trim()} /></View></View></Screen>;
}

export function OnboardingBioScreen({ navigation }: Props<'OnboardingBio'>) {
  const [bio, setBio] = useState('За кофе, долгие прогулки и новые знакомства. Легко собираюсь на авантюры ✨');
  return <Screen><View className="flex-1 px-6"><AuthHeader step={2} onBack={() => navigation.goBack()} /><Title>Пара слов о себе</Title><Body className="mt-2">Что любите и на какую авантюру всегда готовы? Это поможет начать разговор.</Body><View className="mt-8"><Field label="О себе" value={bio} onChangeText={setBio} maxLength={160} multiline hint="Можно коротко — даже одного предложения хватит." /></View><View className="mt-8 gap-2 rounded-input bg-soft p-4"><Text className="font-semibold text-xs text-ink">С чего начать?</Text><Body className="text-xs">Расскажите о любимом месте в городе или о том, чему хотите научиться.</Body></View><View className="flex-1" /><View className="gap-4 pb-4"><PrimaryButton label="Продолжить" onPress={() => navigation.navigate('OnboardingInterests')} /><Pressable accessibilityRole="button" onPress={() => navigation.navigate('OnboardingInterests')}><Text className="text-center font-medium text-xs text-muted">Заполню позже</Text></Pressable></View></View></Screen>;
}

export function OnboardingInterestsScreen({ navigation }: Props<'OnboardingInterests'>) {
  const [selected, setSelected] = useState<string[]>(['Кофе', 'Настолки']);
  const toggle = (interest: string) => setSelected((items) => items.includes(interest) ? items.filter((item) => item !== interest) : [...items, interest]);
  return <Screen><View className="flex-1 px-6"><AuthHeader step={3} onBack={() => navigation.goBack()} /><Title>Что вам по душе?</Title><Body className="mt-2">Выберите интересы — подберём встречи, на которые захочется пойти.</Body><View className="mt-8 flex-row flex-wrap gap-2">{['Футбол', 'Кофе', 'Настолки'].map((interest) => <Chip key={interest} label={`${selected.includes(interest) ? '✓  ' : ''}${interest}`} active={selected.includes(interest)} onPress={() => toggle(interest)} />)}</View><Text className="mt-4 font-sans text-[11px] text-muted">Выбрано: {selected.length} · Можно выбрать несколько</Text><View className="mt-8 gap-4 rounded-card bg-white p-4"><Text className="font-semibold text-sm text-ink">Ваша компания найдётся</Text><View className="flex-row items-center gap-3"><View className="h-10 w-10 items-center justify-center rounded-input bg-pale"><CoffeeIcon /></View><View><Text className="font-semibold text-xs text-ink">Кофе без планов</Text><Text className="font-sans text-[11px] text-muted">Новые знакомства за чашкой кофе</Text></View></View><View className="flex-row items-center gap-3"><View className="h-10 w-10 items-center justify-center rounded-input bg-pale"><GamesIcon /></View><View><Text className="font-semibold text-xs text-ink">Настолки до темноты</Text><Text className="font-sans text-[11px] text-muted">Игры и разговоры в хорошей компании</Text></View></View></View><View className="flex-1" /><View className="gap-4 pb-4"><PrimaryButton label="Завершить" onPress={() => navigation.replace('Main')} /><Text className="text-center font-medium text-xs text-muted">Интересы можно изменить в профиле</Text></View></View></Screen>;
}
