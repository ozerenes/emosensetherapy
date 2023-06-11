import React from 'react';

const LogoutComponent = () => {
    const handleLogout = () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
            window.ethereum
                .request({
                    method: 'wallet_requestPermissions',
                    params: [
                        {
                            eth_accounts: {},
                        },
                    ],
                })
                .then(() => {
                    window.ethereum.removeAccount(window.ethereum.selectedAddress);
                })
                .catch((error) => {
                    console.log('Logout error:', error);
                });
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutComponent;
