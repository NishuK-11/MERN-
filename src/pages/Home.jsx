import React from 'react'
import recipe1 from "../assets/recipe1.jpg"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <>
    <Navbar/>
     <section className='home'>
        <div className="left">
            <h1>Food Recipe</h1>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut pariatur doloribus magni accusamus exercitationem laborum sit qui possimus quis id delectus perferendis quo architecto, praesentium aut suscipit voluptate facilis. Eligendi, nisi odit? Quaerat iusto fuga quas porro dignissimos ipsum ad sint hic? Nobis atque magni labore, iure velit aperiam eum fugiat iste quibusdam praesentium dolorum ea, suscipit deserunt fugit vel blanditiis, quis perferendis quasi! Aliquid inventore eaque corporis atque reprehenderit deserunt dolorum quisquam pariatur, ratione repellat fuga cum, illo quam maiores et. Ut voluptate asperiores dolore eius id harum quidem ex blanditiis fuga, adipisci sint recusandae modi fugiat iusto. Expedita nesciunt ipsa fuga impedit similique quibusdam cupiditate nobis tempore cum voluptatem, molestiae, facilis omnis perferendis? Eveniet molestias voluptatibus impedit tempore, porro natus ducimus voluptates culpa, reiciendis laudantium veritatis, ratione nam atque aliquam inventore repudiandae corrupti neque quasi quo corporis ex totam sequi optio? Eveniet assumenda harum eum. Maxime, vel alias.</h5>
            <button>Share your recipe</button>
        </div>
        <div className="right">
            <img src={recipe1} alt="recipe1" />
        </div>
     </section> 
     <div className="bg">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e7008a" fillOpacity="0.2" d="M0,128L40,112C80,96,160,64,240,74.7C320,85,400,139,480,165.3C560,192,640,192,720,170.7C800,149,880,107,960,90.7C1040,75,1120,85,1200,112C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        </div>
        <Footer/>
    </>
  )
}

export default Home
