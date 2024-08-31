import backgroundImage from "../assets/ASHH5bDmsp6wnK6mEfZdcU.jpg";
import dogs1 from "../assets/dogs1.jpg"
import dogs2 from "../assets/dogs2.jpeg"
import dogs3 from "../assets/dogs3.jpeg"
import FooterComponent from "../components/FooterComponent";
import Header from "../components/header";



export default function Home() {

  return (
    <div className='bg-gray-200 '>
      {/* TabBar resposiva*/}
      <Header page={'Home'}/>
        {/* Container 1 - Welcome */}
      <div 
        style={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }} 
        className="flex text-center p-8 mt-[45px] mx-9 h-72 border-[1px] border-transparent rounded-[30px]"
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-[30px] w-auto text-white grid ">
          <div>
            <h1 className='text-3xl sx:text-5xl'>Welcome To PetAlert</h1>
          </div>
          <div>
            <h3 className='text-lg'>A way to better find your pets when they're lost</h3>
          </div>
        </div>
      </div>

      {/* Container 2 - Help */}


      <div className='flex text-center border-[1px] rounded-3xl mt-[70px] mx-5 h-[70px] justify-center items-center bg-orange-400 text-white'>
        <p className='text-sm sx:text-xl m-auto'>Help other users reunite with their lost pets and find happiness again</p>
      </div>

      {/* Container 3 - Images */}

      <div className="flex justify-center items-center mt-[70px] w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-[1px] rounded-3xl mx-5 bg-orange-400 p-5">
          <img src={dogs1} alt="Dogs1" className="rounded-[20px] w-full h-32 md:h-48 object-cover" />
          <img src={dogs2} alt="Dogs2" className="rounded-[20px] w-full h-32 md:h-48 object-cover" />
          <img src={dogs3} alt="Dogs3" className="rounded-[20px] w-full h-32 md:h-48 object-cover" />
        </div>
      </div>


      {/* Container 4 - About */}

      <div className='flex text-center border-[1px] rounded-3xl mt-[70px] mx-5 h-[70px] justify-center items-center bg-orange-400 text-white mb-14'>
        <p className='text-sm sx:text-xl m-auto'>Help other users reunite with their lost pets and find happiness again</p>
      </div>


      {/* Footer */}

      <FooterComponent />

    </div>
    
  )
}

