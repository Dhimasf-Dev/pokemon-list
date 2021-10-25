/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Header from './header/Header'
import Home from './home/Home'
import Footer from './footer/Footer'
import MyPokemon from './myPokemon/MyPokemon'
import Detail from './detail/Detail'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ContexProvider from './Contex'

const appContainer = css({
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // minHeight: '100vh',
    // padding: '3rem 0.5rem'
    //background: '#18181B'
})

function App() {
  return (
    <BrowserRouter>
        <div css={appContainer}>
            <ContexProvider>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/myPokemon" exact component={MyPokemon} />
                    <Route path="/detail" exact component={Detail} />
                </Switch>
                <Footer />
            </ContexProvider>
        </div>
    </BrowserRouter>
  );
}

export default App;
