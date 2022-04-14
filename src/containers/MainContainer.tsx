import { useState } from "react"
import AddContainer from "./AddContainer"
import Drawer from "./Drawer"
import ListContainer from "./ListContainer"
import TotalContainer from "./TotalContainer"

type Props = {}

export default function MainContainer({ }: Props) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="container mx-auto p-4 h-full max-w-md">


      {isOpen && (
        <>
          <section
            className="absolute top-0 left-0 w-full h-full cursor-pointer "
            onClick={() => {
              setIsOpen(false);
            }}
          ></section>

          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <AddContainer />
          </Drawer></>
      )}


      <TotalContainer />

      <ListContainer />

      <div className='w-full fixed left-0 -bottom-2 p-4 py-6 bg-white' style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`
      }}>
        <button
          onClick={() => setIsOpen(true)}
          type="button" className="mb-4 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-bold rounded-2xl text-sm px-5 py-2.5 text-center">
          ADD
        </button>
      </div>
    </div >
  )
}