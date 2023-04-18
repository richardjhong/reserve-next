import NavBar from '@/app/components/NavBar'
import Header from './components/Header'
import Form from './components/Form'

const ReservationPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
       <NavBar />
        <div className="border-t h-screen text-black">
          <div className="py-9 w-3/5 m-auto">
            <Header />
            <Form />
          </div>
        </div>
      </main>
    </main>
  )
}

export default ReservationPage;