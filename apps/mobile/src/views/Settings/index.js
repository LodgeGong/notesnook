import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastStorage from 'react-native-fast-storage';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {
  ACCENT,
  COLOR_SCHEME,
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  opacity,
  pv,
  SIZE,
  WEIGHT,
} from '../../common/common';
import Container from '../../components/Container';
import {Header} from '../../components/header';
import {useTracked} from '../../provider';
import NavigationService from '../../services/NavigationService';
export const Settings = ({navigation}) => {
  const [state, dispatch] = useTracked();
  const {colors} = state;

  ///
  function changeColorScheme(colors = COLOR_SCHEME, accent = ACCENT) {
    let newColors = setColorScheme(colors, accent);
    StatusBar.setBarStyle(newColors.night ? 'light-content' : 'dark-content');

    dispatch({type: ACTIONS.THEME, colors: newColors});
  }

  function changeAccentColor(accentColor) {
    ACCENT.color = accentColor;
    ACCENT.shade = accentColor + '12';
    changeColorScheme();
  }

  return (
    <Container noBottomButton={true}>
      <View>
        <Header
          menu={true}
          colors={colors}
          heading="Settings"
          canGoBack={false}
        />

        <FlatList
          data={[
            {
              name: 'General',
              func: () => {},
            },
            {
              name: 'Account',
              func: () => {
                NavigationService.navigate('AccountSettings');
              },
            },
            {
              name: 'Theme',
              customComponent: (
                <View>
                  <ScrollView
                    contentContainerStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}>
                    {[
                      '#e6194b',
                      '#3cb44b',
                      '#ffe119',
                      '#0560FF',
                      '#f58231',
                      '#911eb4',
                      '#46f0f0',
                      '#f032e6',
                      '#bcf60c',
                      '#fabebe',
                    ].map(item => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => {
                          changeAccentColor(item);

                          FastStorage.setItem('accentColor', item);
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 10,
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 45,
                            height: 45,
                            backgroundColor: item,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {colors.accent === item ? (
                            <Icon size={SIZE.lg} color="white" name="check" />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      if (!colors.night) {
                        FastStorage.setItem(
                          'theme',
                          JSON.stringify({night: true}),
                        );
                        changeColorScheme(COLOR_SCHEME_DARK);
                      } else {
                        FastStorage.setItem(
                          'theme',
                          JSON.stringify({night: false}),
                        );

                        changeColorScheme(COLOR_SCHEME_LIGHT);
                      }
                    }}
                    activeOpacity={opacity}
                    style={{
                      width: '85%',
                      marginHorizontal: '5%',
                      paddingVertical: pv + 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: SIZE.sm + 1,
                        fontFamily: WEIGHT.regular,
                        textAlignVertical: 'center',
                        color: colors.pri,
                      }}>
                      Dark Mode
                    </Text>
                    <Icon
                      size={SIZE.md}
                      color={colors.night ? colors.accent : colors.icon}
                      name={colors.night ? 'toggle-right' : 'toggle-left'}
                    />
                  </TouchableOpacity>
                </View>
              ),
            },
            {
              name: 'Terms of Service',
              func: () => {},
            },
            {
              name: 'Privacy Policy',
              func: () => {},
            },
            {
              name: 'About',
              func: () => {},
            },
          ]}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.name}
              activeOpacity={opacity}
              onPress={item.func}
              style={{
                borderBottomWidth: 1,
                width: item.step ? '85%' : '90%',
                marginHorizontal: '5%',
                borderBottomColor: colors.nav,
                paddingVertical: pv + 5,

                marginLeft: item.step ? '10%' : '5%',
              }}>
              <Text
                style={{
                  fontSize: item.step ? SIZE.sm : SIZE.md,
                  fontFamily: WEIGHT.regular,
                  textAlignVertical: 'center',
                  color: colors.pri,
                }}>
                {item.name}
              </Text>
              {item.customComponent ? item.customComponent : null}
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

Settings.navigationOptions = {
  header: null,
};

export default Settings;
