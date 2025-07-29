"use client"
import Header from '@/components/Header';
import { store } from '@/store';
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Provider store={store}>
                <Header />
                {children}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Provider>
        </>
    )
}

export default layout
