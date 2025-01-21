import { useEffect, useState } from "react";
import { getListRestaurants } from "../../services/restaurant";

interface PropsFilter {
    label: string;
    type?: string;
    filterData: any;
    filterBy?: any;
    data: any;
    setOriginalData: any
    setIsFilter: (isFilter: boolean) => void
}

export function Filter(props: PropsFilter) {
    const { label, type = "dropdown", filterData, filterBy, data: originalData, setOriginalData, setIsFilter } = props;
    const [isChecked, setIsChecked] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        handleFilter()
    }, [isChecked, selectedValue])

    const filterCategories = async () => {
        const param = `?establishmentTypeAndCuisineTags=${selectedValue}`;
        const response = await getListRestaurants(param);

        const filteredRestaurants = response.data.filter((item: any) => {
            return item.establishmentTypeAndCuisineTags.length > 0 &&
                item.establishmentTypeAndCuisineTags[0].toLowerCase() === selectedValue.toLowerCase();
        });

        filterData(filteredRestaurants)
        setOriginalData(filteredRestaurants)
    };

    const filterOpen = () => {
        if (isChecked == true) {
            filterData((prev: any) => {
                const filteredRestaurants = prev.filter((item: any) => item.currentOpenStatusCategory == "OPEN")
                return filteredRestaurants
            })
        } else {
            filterData(originalData)
        }
    }

    const filterPrice = () => {
        filterData(() => {
            const filteredRestaurants = originalData.filter((item: any) => item.priceTag.includes(selectedValue))
            return filteredRestaurants
        })
    }

    const handleFilter = () => {
        if (label.toLowerCase() == 'categories' && selectedValue != '') filterCategories()
        if (label.toLowerCase() == 'price' && selectedValue != '') filterPrice()
        if (label.toLowerCase() == 'open now') filterOpen()
    }

    return (
        <div className="border-b border-b-black/30 py-2">
            {type === "dropdown" && filterBy && (
                <select
                    className="outline-none"
                    value={selectedValue}
                    onChange={(e) => {
                        setSelectedValue(e.target.value)
                        setIsFilter(true)
                    }}
                >
                    <option value="" disabled>{label}</option>
                    {filterBy.map((item: any, index: number) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            )}
            {type === "checkbox" && (
                <div className="flex items-center gap-x-2">
                    <input
                        type="checkbox"
                        onClick={() => setIsChecked(!isChecked)}
                        onChange={() => setIsFilter(true)}
                        className={`${isChecked ? "bg-green-500" : ""} rounded-[50%] outline-none appearance-none border border-black/20 cursor-pointer w-4 h-4`}
                        name=""
                        id=""
                    />
                    <div className="">{label}</div>
                </div>
            )}
        </div>
    );
}