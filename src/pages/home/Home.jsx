import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/herosection/HeroSection'
import Category from '../../components/category/Category'
import HomeCard from '../../components/homepageproductcard/HomeCard'
import Track from "../../components/Track/Track"
import Testimonial from '../../components/testimonial/Testimonial'
import Homevideo from "../user/Homevideo"

// NEW
import LoadingScreen from '../../LoadingScreen';

const Home = () => {
  return (
    <>
      <LoadingScreen />
      <Layout>
        <Homevideo/>
        <Track/>
        <HeroSection/>
        <Category/>
        <Testimonial/>
        <HomeCard/>
      </Layout>
    </>
  )
}

export default Home
