import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        {/* Add margin-top to separate navbar from content */}
        <div className="maincontent min-h-screen mt-[8vh]">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
