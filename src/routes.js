import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Main from './pages/Main';
import NewHistory from './pages/NewHistory';
import RegisterMachine from './pages/RegisterMachine';
import RegisterClient from './pages/RegisterClient';
import QrCode from './pages/QrCode';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: ''
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login'
            }
        },
        NewHistory: {
            screen: NewHistory,
            navigationOptions: {
                title: 'Cadastrar Histórico'
            }
        },
        RegisterClient: {
            screen: RegisterClient,
            navigationOptions: {
                title: 'Cliente'
            }
        },
        RegisterMachine: {
            screen: RegisterMachine,
            navigationOptions: {
                title: 'Máquina'
            }
        },
        QrCode: {
            screen: QrCode,
            navigationOptions: {
                title: 'QR Code'
            }
        },
        
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#2ff595'
            }
        }
    })
)

export default Routes;