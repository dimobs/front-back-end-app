import '@testing-library/jest-dom/vitest';
import { it, expect, describe, afterEach, beforeEach } from 'vitest';
import { cleanup, render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest'; // Add this lin
import { BrowserRouter } from 'react-router-dom';
const mockChangeAuthState = vi.fn();
const mockLogout = vi.fn();
import Header from './Header';
import { AuthContext } from '../../context/auth/AuthContext';
let authContextValue;

beforeEach(async () => {
    authContextValue = {
        isAuthenticated: false,
        email: '',
        totalAmount: 0,
        changeAuthState: mockChangeAuthState,
        logout: mockLogout,
    };

  });

afterEach(() => {
    cleanup()
})

describe('HeaderTest', () => {
    it('shows `Login` button on first render', () => {
        
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{authContextValue}}>
                <Header />
            </AuthContext.Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    })

    it('click `Login` and render Log in page', async () => {
        const authContextValue = {
            isAuthenticated: false,
            email: '',
            totalAmount: 0,
            changeAuthState: mockChangeAuthState,
            logout: mockLogout,
        };
        
        render(
            <BrowserRouter>
            <AuthContext.Provider value={authContextValue}>
                <Header />
            </AuthContext.Provider>
            </BrowserRouter>
        )

        const singInElement = screen.getByText(/Login/i)

        await act(async() => {
            fireEvent.click(singInElement)
        })

        expect(window.location.pathname).toBe('/login')
    })

    it('click home Link and render table', async () => {
        render(
            <BrowserRouter>
                <AuthContext value={authContextValue}>
                    <Header />
                </AuthContext>
            </BrowserRouter>
        )

        const allLinks = screen.getAllByRole('link')

        await act(async() => {
            fireEvent.click(allLinks[1])
        })
        expect(window.location.pathname).toBe('/movies/Featured%20Today')
    })

    // it('click top rated Link and render top rated', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AuthContext>
    //                 <Header />
    //             </AuthContext>
    //         </BrowserRouter>
    //     )

    //     const allLinks = screen.getAllByRole('link')

    //     await act(async() => {
    //         fireEvent.click(allLinks[2])
    //     })
    //     expect(window.location.pathname).toBe('/movies/Top%20Rated')
    // })

    // it('click people Link and render all people', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AuthContext>
    //                 <Header />
    //             </AuthContext>
    //         </BrowserRouter>
    //     )

    //     const allLinks = screen.getAllByRole('link')

    //     await act(async() => {
    //         fireEvent.click(allLinks[3])
    //     })
    //     expect(window.location.pathname).toBe('/people')
    // })

    // it('click contactUs Link and render the contact us page', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AuthContext>
    //                 <Header />
    //             </AuthContext>
    //         </BrowserRouter>
    //     )

    //     const allLinks = screen.getAllByRole('link')

    //     await act(async() => {
    //         fireEvent.click(allLinks[4])
    //     })
    //     expect(window.location.pathname).toBe('/ContactUs')
    // })

    // it('checks log out Link is not on the page', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AuthContext>
    //                 <Header />
    //             </AuthContext>
    //         </BrowserRouter>
    //     )

    //     const logOutLink = screen.queryByText(/log out/i)
    //     expect(logOutLink).toBeNull()
    // })
})