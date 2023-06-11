import React, { useState, useEffect } from 'react';

const BalanceComponent = ({ account }) => {
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (account) {
            fetchBalance();
        }
    }, [account]);

    const fetchBalance = async () => {
        try {
            const response = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest'],
            });
            const weiBalance = response.result;
            const ethBalance = window.ethereum.utils.fromWei(weiBalance, 'ether');
            setBalance(ethBalance);
        } catch (error) {
            console.log('Balance fetch error:', error);
        }
    };

    return (
        <div>
            {account ? (
                <div>
                    <p>Account: {account}</p>
                    <p>Balance: {balance} ETH</p>
                </div>
            ) : (
                <p>No account connected</p>
            )}
        </div>
    );
};

export default BalanceComponent;
