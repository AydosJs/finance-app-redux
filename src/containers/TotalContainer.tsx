import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
import { flowList, totalAmountControl } from "../features/flow/flowSlice"

type Props = {}

function TotalContainer({ }: Props) {
  const baseAmount = useAppSelector(flowList => flowList.flow.baseAmount)
  const dispatch = useDispatch()


  return (
    <div className="flex items-center flex-col justify-center mt-20 mb-8">
      <p className="">Spent this week</p>
      <p className="text-[3rem] font-semibold">
        <span className="tetx-sm">$</span>
        {baseAmount.totalAmount}
      </p>
    </div>
  )
}

export default TotalContainer