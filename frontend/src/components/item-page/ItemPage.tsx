import { FC, useEffect } from "react"
import { useGetItemQuery } from "../../store/api/items.storeApi"
import { useParams } from "react-router"


const ItemPage: FC = () => {
  const { itemId } = useParams();
  const { data: item, isLoading } = useGetItemQuery(itemId as string, {});
  return (
    <section>
      {isLoading ? 'Загрузка...' : item?.name}
    </section>
  )
}

export default ItemPage
