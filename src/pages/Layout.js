import Navbar from '../components/Navigation'
import Footer from '../components/Footer'

export default function Layout({children}) {
    return (
        <>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}