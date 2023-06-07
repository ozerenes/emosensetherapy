import React from 'react'

export default () => {
    return (
        <footer>
            <div className="flex-row">
                <div className="flex-column col-md-6 color-white">
                    <div className={"p-my color-white font-size-xl"}>Geliştiriciler</div>
                    <a className={"p-my color-white"} href="/">Ömer Aydın</a>
                    <a className={"p-my color-white"} href="/hakkimizda">Enes Özer</a>
                </div>
                <div className="flex-column col-md-6 color-white">
                    <a className={"p-my color-white"} href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a className={"p-my color-white"} href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a className={"p-my color-white"} href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
            <div className="center-container">
                <p className="copy-text color-white">© 2023 Örnek Şirketi. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    )
}