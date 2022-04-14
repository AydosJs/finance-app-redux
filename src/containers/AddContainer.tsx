import { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
import { createItem } from "../features/flow/APIFunction"
import { CategoryState, flowList, ItemState } from "../features/flow/flowSlice"

type Props = {}

export default function AddContainer({ }: Props) {
  const dispatch = useDispatch()

  const flowSlice = useAppSelector(flowList)
  const categoryList = flowSlice.category

  // const validation = {
  //   amount: {
  //     status: false,
  //     title: `The amount've to be biger than 0`
  //   }
  // }

  const [amount, setAmount] = useState<string | number>(0)
  const [title, setTitle] = useState<string | null>('')
  const [category, setCategory] = useState<string | number>(categoryList[0].id)

  const chageCategory = (e: any) => {
    setCategory(Number(e.target.value))
  }

  const postItem = async (event: any) => {

    try {
      event.preventDefault()
      const payload: ItemState = {
        amount: amount !== undefined ? Number(amount) : 0,
        title: title !== '' ? title : null,
        categoryId: Number(category),
        date: new Date().toLocaleString()
      }

      if (payload.amount !== 0) {
        const res = await dispatch(createItem(payload))
        console.log('RES', res, payload)
      }
    } catch (e) {
      console.log('CRETE 1 ERRO', e)
    } finally {
      setAmount(0)
    }

  }

  return (
    <form onSubmit={(e) => postItem(e)} className="flex flex-col space-y-6 justify-between ">
      <div className="">
        <label htmlFor="base-amount" className="block mb-2 text-sm font-medium">
          Amount
        </label>
        <input value={Number(amount)} onChange={(e) => setAmount(e.target.value)} max={10000} type="text" id="base-amount" className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

      </div>
      <div className="">

        <label htmlFor="base-catefory" className="block mb-2 text-sm font-medium">
          Select category
        </label>
        <select
          onChange={chageCategory}
          id="base-catefory" className="border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          {categoryList && categoryList.map((item: CategoryState) => (
            <option value={item.id} selected={item.id === category} key={item.id}>{item.title}</option>
          ))}
        </select>

      </div>
      <div className="">
        <label htmlFor="base-title" className="block mb-2 text-sm font-medium">
          Title
        </label>
        <input value={String(title)} onChange={(e) => setTitle(e.target.value)} type="text" id="base-title" className="text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>

      <button
        type="submit" className=" mt-4 w-full rounded-lg text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-bold text-sm px-5 py-2.5 text-center 
      ">
        ADD
      </button>
    </form>
  )
}