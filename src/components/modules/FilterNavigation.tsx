import { useEffect, useState } from "react";
import { Button } from "../element/Button";
import { Filter } from "../element/Filter";
import { getListCategories } from "../../services/restaurant";

export function FilterNavigation(props: { filterData: any, data: any, setOriginalData: any }) {
    const { filterData, data, setOriginalData } = props;
    const [categories, setCategories] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    const filterOptions = [
        { label: "Open Now", type: "checkbox" },
        { label: "Price", filterBy: [{ 'name': '$$ - $$$' }, { 'name': '$$$$' }] },
        { label: "Categories", filterBy: categories }
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getListCategories();
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const clearFilters = async () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-between border-y py-4 px-16 my-4">
            <div className="flex items-center gap-x-4">
                <div>Filter By:</div>
                {filterOptions.map((option, index) => (
                    <Filter
                        key={index}
                        setIsFilter={setIsFilter}
                        data={data}
                        setOriginalData={setOriginalData}
                        filterData={filterData}
                        label={option.label}
                        type={option.type}
                        filterBy={option.filterBy}
                    />
                ))}
            </div>
            <div>
                <Button isActive={isFilter} label="clear all" onClick={clearFilters} />
            </div>
        </div>
    );
}