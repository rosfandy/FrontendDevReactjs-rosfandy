import { useEffect, useState } from "react";
import { Button, FilterNavigation } from "../../components";
import { getListRestaurants } from "../../services/restaurant";
import { Card } from "../../components/element/Card";

export function Main() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);
    const [fiteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await getListRestaurants();
            if (response.data.length > 0) {
                setFilteredData(response.data)
                setRestaurants(response.data);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    return (
        <div className="py-8 px-32">
            <section className="flex flex-col gap-y-4">
                <h1 className="text-5xl">Restaurants</h1>
                <p className="text-lg text-gray-500 w-1/2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta at iste ullam, laudantium culpa provident. Blanditiis quasi quisquam nesciunt eveniet quia repellendus nulla ad harum nemo, error qui quae.
                </p>
            </section>

            <FilterNavigation data={restaurants} setOriginalData={setRestaurants} filterData={setFilteredData} />

            <section>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="">
                        <div className="flex flex-wrap gap-x-8 gap-y-8 justify-center">
                            {fiteredData.length > 0 ?
                                fiteredData.slice(0, visibleCount).map((item: any, index) => (
                                    <Card key={index} item={item} />
                                )) :
                                <div className="">No data</div>
                            }
                        </div>
                        {fiteredData.length > visibleCount && (
                            <div className="flex justify-center">
                                <div className="w-1/5 mt-24 mb-8">
                                    <Button onClick={loadMore} label="load more" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>


        </div>
    );
}