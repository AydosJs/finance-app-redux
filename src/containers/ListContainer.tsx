import { Link } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import ListItem from "../components/ListItem"
import { ItemState } from "../features/flow/flowSlice"

type Props = {}

function ListContainer({ }: Props) {

  const items = useAppSelector(flowList => flowList.flow.items)
  return (
    <div className="flex flex-col pb-40">
      {items && items.map((item: ItemState) =>
        <Link key={item.id} to={`/item/${item.id}`}>
          <ListItem list={items} item={item} />
        </Link>)
      }
    </div>
  )
}

export default ListContainer