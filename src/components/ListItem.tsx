import { useAppSelector } from "../app/hooks"
import { CategoryState, flowList, flowState, ItemState } from "../features/flow/flowSlice"

type Props = {
  item: ItemState,
  list?: Array<ItemState>
}

export default function ListItem({ item }: Props) {
  const category = useAppSelector(flowList => flowList.flow.category)
  const itemCategory: CategoryState = category[category.findIndex(cate => cate.id == item.categoryId)]


  return (
    <div className='flex flex-row items-center group hover:bg-gray-100 cursor-pointer'>
      <div className='basis-1/6 p-4'>
        {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg> */}
        {/* <p className="text-2xl">🦄</p> */}
        <img className="w-10" src={itemCategory?.icon!} alt="" />
      </div>

      <div className='basis-5/6 flex flex-row items-center justify-between border-b-[1px] p-4'>
        <div className='flex flex-col'>
          <p className='font-bold text-base'>{item.title == null ? 'No title' : item.title}</p>
          <p className='font-medium text-xs'>{item.date}</p>
        </div>
        <div className='flex flex-col'>
          <p className={`font-bold text-base text-right  
          ${itemCategory?.type === 1 ?
              'text-gray-900' : 'text-red-500'}`}>
            {
              itemCategory?.type === 2 && '-'
            }
            $ {item.amount}</p>
          <p className='font-medium text-right text-xs'>
            {itemCategory?.title}
          </p>
        </div>
      </div>
    </div>
  )
}