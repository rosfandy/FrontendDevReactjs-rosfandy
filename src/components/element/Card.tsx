import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Rating } from "./Rating"

export const Card = ({ item }: { item: any }) => {
    return (
        <div className="h-[450px] flex flex-col justify-between">
            <div className="">
                <img src={item.squareImgUrl.split("?")[0]} className="w-[350px] h-[250px] rounded" alt="" />
                <div className="font-medium text-xl py-2">{item.name}</div>
                <Rating rating={item.averageRating} />
                <div className="flex justify-between items-center">
                    <div className="text-gray-500">
                        <span className="font-medium">{item.establishmentTypeAndCuisineTags[0]} </span>
                        -
                        <span className="font-medium"> {item.priceTag}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className={`${item.currentOpenStatusCategory == "OPEN" ? 'bg-green-500' : 'bg-red-500'} w-2 h-2 rounded-[50%] `}></div>
                        {item.currentOpenStatusCategory == "OPEN" ? "OPEN NOW" : "CLOSED"}
                    </div>
                </div>
            </div>
            <Link to={`/details/${item.restaurantsId}`}>
                <Button label="read more" />
            </Link>
        </div>
    )
}