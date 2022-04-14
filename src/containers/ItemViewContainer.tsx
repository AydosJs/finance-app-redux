import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { deleteItem, getItemById } from "../features/flow/APIFunction"
import { ItemState, totalAmountControl } from "../features/flow/flowSlice"
import MainLayout from "../layout/MainLayout"

type Props = {}

function ItemViewContainer({ }: Props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [item, setItem] = useState<ItemState | null>(null)
  const category = useAppSelector(flowList => flowList.flow.category)
  const navigate = useNavigate()

  const findCategory = (id: number | string) => {
    return category.find(fil => fil.id === id)
  }

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      if (id) {
        const res: any = await dispatch(getItemById(String(id)))
        console.log('ID', id, res)
        setItem(res?.payload[0])
      }
    } catch (e) {
      console.log('ERROR TO GET USER', e)
    }
  }

  const deletItem = async (id: string | number) => {
    try {
      const res = await dispatch(deleteItem(id))
    } catch (e) {
      console.log('DELETE ITEM ERROR', e)
    } finally {
      dispatch(totalAmountControl())
      navigate('/')
    }
  }

  return (
    <MainLayout>
      {
        item && (
          <div className="h-full mt-4 flex flex-col space-y-4 items-center">
            <img className="w-[150px]" src={findCategory(item?.categoryId!).icon} alt="" />
            <h2 className="text-2xl text-gray-900 font-bold ">{item.title}</h2>
            <div className="">
              <p className={`text-4xl font-bold text-center ${findCategory(item?.categoryId!).type == 1 ? 'text-gray-900' : 'text-red-500'}`}>
                {
                  findCategory(item?.categoryId!).type == 2 && '-'
                } $ {item.amount}</p>
              <p className="text-lg font-medium text-center">{item.date}</p>
            </div>

            <button onClick={() => deletItem(item.id!)} className=" text-white font-bold hover:bg-red-500/90 drop-shadow-md py-2 px-4 bg-red-500 rounded-full">
              DELETE ITEM
            </button>

            <Link className="fixed bottom-20 text-sm font-semibold hover:underline hover:underline-offset-1" to={'/'}>
              &#8592; &nbsp; BAKC TO HOME PAGE
            </Link>
          </div>
        )
      }
    </MainLayout>

  )
}

export default ItemViewContainer