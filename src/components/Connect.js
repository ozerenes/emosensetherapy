import React, { useState, useEffect } from 'react';
import AccountInfo from "./AccountInfo";

const WalletIntegrationComponent = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    // useEffect(() => {
    //     initializeMetaMask();
    // }, []);

    const initializeMetaMask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                setAccounts(accounts);
            } catch (error) {
                console.log('MetaMask enable error:', error);
            }
        } else {
            console.log('MetaMask not found');
        }
    };

    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            try {
                const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccounts(newAccounts);
            } catch (error) {
                console.log('MetaMask account request error:', error);
            }
        }
    };

    return (
        <div>
            {accounts.length > 0 ? (
                <div>
                    <label>Select Account:</label>
                    <select value={selectedAccount} onChange={handleAccountChange}>
                        {accounts.map((account) => (
                            <option key={account} value={account}>
                                {account}
                            </option>
                        ))}
                    </select>
                    {accounts.map((account) => (
                        <AccountInfo account={account}/>
                    ))}
                </div>
            ) : (
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletIntegrationComponent;
