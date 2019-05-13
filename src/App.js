import React from 'react';
import logo from './logo.svg';
import './App.css';
import TipserSDK from '@tipser/tipser-sdk';
import Button from '@material-ui/core/Button';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

const tipser = new TipserSDK('5075d7715c3d090a90585e87', { env: 'dev' });

class App extends React.Component {
    state = {
        cartSize: 0,
    };

    onClick = () => {
        tipser
            .addToCart('5ba2334a781baa0001ccdf33')
            .then(() => {
                debugger;
                return tipser.getCurrentCartSize();
            })
            .then(cartSize => this.setState({ cartSize }));
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
                        <Button variant="contained" color="primary" onClick={() => tipser.openPurchaseDialog()}>
                            Open shop cart
                            <ShoppingBasket />
                            {this.state.cartSize > 0 && this.state.cartSize}
                        </Button>
                    </div>
                </header>
                <div className="main">
                    <Button variant="contained" color="primary" onClick={this.onClick}>
                        Add to cart item
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
