import { FC } from "react"
import { useGetItemsQuery } from "../../store/api/items.storeApi"
import { useParams } from "react-router"


const ItemPage: FC = () => {
  const { data } = useGetItemsQuery(null, {})
  const params = useParams();

  const item = data?.find(item => item._id === params.itemId);

  return (
    <section>
      {item?.name}
    </section>
  )
}

export default ItemPage
