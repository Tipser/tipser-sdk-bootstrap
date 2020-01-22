import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TipserSDK, TipserSdkConfig, TipserEnv, TipserLang } from '@tipser/tipser-sdk';
import Button from '@material-ui/core/Button';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

const posId = '5075d7715c3d090a90585e87';

const tipserSdkConfig: TipserSdkConfig = {
    posId: '45cbc4a0e4123f6920000002',
    lang: 'en-US',
    env: TipserEnv.dev,
    primaryColor: '#f00',
    modalUi: {
        hideSearchIcon: true,
        hideFavouritesIcon: true,
        hideCartIcon: true,
        hideMoreIcon: true,
        hideSimilarProducts: true,
    },
};

const tipserSdk = TipserSDK(posId, tipserSdkConfig);

class App extends React.Component {
    state = {
        cartSize: 0,
    };

    componentDidMount() {
        this.updateCartSize();
    }

    updateCartSize = () => {
        tipserSdk.getCurrentCartSize().then(cartSize => this.setState({ cartSize }));
    };

    addToCart = () => {
        tipserSdk.addToCart('5ba2334a781baa0001ccdf33').then(this.updateCartSize);
    };

    addToCartAndOpenCheckout = () => {
        tipserSdk.openDirectToCheckoutDialog('5ba2334a781baa0001ccdf33').then(this.updateCartSize);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-header__container">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>Shop</p>
                    </div>
                    <div className="App-header__container">
                        <Button variant="contained" color="primary" onClick={() => tipserSdk.openPurchaseDialog()}>
                            Open shop cart
                            <ShoppingBasket />
                            {this.state.cartSize > 0 && this.state.cartSize}
                        </Button>
                    </div>
                </header>
                <div className="main">
                    <Button variant="contained" color="primary" onClick={this.addToCart}>
                        Add to cart item
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.addToCartAndOpenCheckout}>
                        Add to cart item and open checkout
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
