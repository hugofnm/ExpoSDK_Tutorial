// Tutoriel Expo SDK
// https://docs.expo.dev/get-started/installation/

// Import libraries
import { React, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ApplicationProvider,
  Button,
  IconRegistry,
  Text,
  Icon,
  BottomNavigation, 
  BottomNavigationTab
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icônes
const Home = (props) => (
    <Icon
      {...props}
      name='home-outline'
    />
);

const Count = (props) => (
    <Icon
      {...props}
      name='hash-outline'
    />
);

const Weather = (props) => (
    <Icon
      {...props}
      name='sun-outline'
    />
);

// Tableau associatif pour les codes météo
const weatherCode = { // Tiré de https://open-meteo.com/en/docs/
    "Soleil" : [0, 1, 2],
    "Nuageux" : [3, 45, 48],
    "Pluie" : [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 80, 81, 82, 95, 96]
};

// Fonction principale de l'écran Tuto1
function Tuto1() {


    // ------------------------------
    // Retourne le contenu de l'écran
    // return ( contenu de l'écran en JSX )

    // JSX : JavaScript XML
    // Permet de mélanger du code JavaScript et du code HTML

    // Les balises <View> permettent de regrouper des éléments
    // Les balises <Text> permettent d'afficher du texte
    // Les balises <Button> permettent d'afficher un bouton
    // ------------------------------
    return (
        <View style={styles.container}>
            <Text style={styles.textLarge}> SAE Roue - Tutoriel 1 </Text>
            <Text style={styles.textLarge}> Secouez le téléphone pour afficher le mode débug. </Text>
            <Text style={styles.textLarge}> Utilisez les boutons en bas pour faire défiler les menus. </Text>

            { /* Essayez de modifier le texte en bas pour voir les changements en direct */ }
            <Text style={styles.textLarge}> Hello World ! </Text>
        </View>
    );
}

// Fonction de l'écran Tuto2
function Tuto2() {

    // Variables d'état
    // const [nom de la variable, fonction de mise à jour de la variable] = useState(valeur initiale)
    const [count, setCount] = useState(0);
    const [couleur, setCouleur] = useState('success');

    // Fonction pour déterminer si un nombre est pair
    // function nomDeLaFonction(paramètres) { instructions }
    function estPair(res) {
        return res % 2 === 0;
    }

    // Return UI
    return (
        <View style={styles.container}>
            <Text style={styles.textLarge}> SAE Roue - Tutoriel 2 </Text>
            <Text style={styles.textLarge}> Comptage : {count} </Text>
            <Button style={styles.button} status='success' onPress={() => setCount(count + 1)}> Ajouter 1 </Button>
            <Button style={styles.button} status='danger' onPress={() => setCount(count - 1)}> Retirer 1 </Button>
            <Button style={styles.button} onPress={() => setCount(0)}> Remise à zéro </Button>
        </View>
    );
}

// Fonction de l'écran Tuto3
function Tuto3() {

    // Variables d'état
    // const [nom de la variable, fonction de mise à jour de la variable] = useState(valeur initiale)
    const [res, setRes] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [weather, setWeather] = useState('Aucun');

    // Fonction pour récupérer la météo depuis une requête HTTP GET
    // function nomDeLaFonction(paramètres) { instructions }
    async function getWeather() {

        // Requête HTTP GET pour récupérer la météo
        await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.70&longitude=7.25&current=temperature_2m,weather_code&timezone=auto&forecast_days=1')
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => setRes(data.current)) // Mise à jour de la variable d'état avec la réponse
        
        if (res === '') {
            return;
        } else {
            // Affichage de la réponse dans la console
            console.log(res);
            
            // Mise à jour de la température
            setTemperature(res.temperature_2m);

            // Détermination de la météo avec une boucle for
            for (const [key, value] of Object.entries(weatherCode)) {
                if (value.includes(res.weather_code)) {
                    setWeather(key);
                }
            }
        }
    }

    // Return UI
    return (
        <View style={styles.container}>
            <Text style={styles.textLarge}> SAE Roue - Tutoriel 3 </Text>
            <Text style={styles.textLarge}> Température : {temperature}°C </Text>
            <Text style={styles.textLarge}> Météo : {weather} </Text>
            <Button style={styles.button} onPress={() => getWeather()}> Récupérer la Météo </Button>
        </View>
    );
}

// Feuille de style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
    },
    textLarge: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

// Création de la pile de navigation
const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        style={{ marginBottom: 32 }}
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={Home} title='Tutoriel 1'/>
            <BottomNavigationTab icon={Count} title='Tutoriel 2'/>
            <BottomNavigationTab icon={Weather} title='Tutoriel 3'/>
    </BottomNavigation>
);
  
const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Tutoriel 1' component={Tuto1}/>
        <Screen name='Tutoriel 2' component={Tuto2}/>
        <Screen name='Tutoriel 3' component={Tuto3}/>
    </Navigator>
);

// Main function
export default function Main() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <TabNavigator/>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}