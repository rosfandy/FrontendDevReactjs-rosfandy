import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Maps from "../../components/element/Maps";
import { Rating } from "../../components";
import { getDetailRestaurant } from "../../services/restaurant";

export function Detail() {
    const { id: restaurantId } = useParams<{ id: string }>();
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // console.log(db.data.openHours);
            const response = await getDetailRestaurant(restaurantId)
            console.log(response)
            setData(response.data.data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="">
                    {data && data.location ? (
                        <div className="flex w-full ">
                            <div className="w-full h-[100vh] bg-center bg-no-repeat" style={{ backgroundImage: `url(${data.heroMedia.media[0].data.sizes[7].url})` }}>
                                <div className="w-full h-full bg-black/60 p-8 flex flex-col justify-end">
                                    <div className="">
                                        <h1 className="text-4xl font-bold text-white">
                                            {data.overview.name}
                                        </h1>
                                        <Rating rating={data.overview.rating} />
                                        <p className="text-white text-lg">{data.restaurantAbout.content[0].collapsibleTextSubsectionText?.text}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <Maps
                                    latitude={data.location.address.geoPoint.latitude}
                                    longitude={data.location.address.geoPoint.longitude}
                                    address={data.location.address.address}
                                />
                                <div className=" p-4 text-black absolute top-[35rem] z-[999] bg-white/80 backdrop-blur-sm">
                                    <h2 className="text-2xl border-y py-2">Open Hours</h2>
                                    <ul className="list-disc p-5 flex flex-col gap-y-2">
                                        {data.openHours.hoursForDays.map((hour: any, index: number) => (
                                            <div key={index} className="flex gap-x-12 justify-between mb-2">
                                                <div className="">
                                                    {hour.day.text}
                                                </div>
                                                <div className="">
                                                    {hour.localizedIntervals[0]?.text || "Closed"}
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                    <p className="mt-2">
                                        <strong>{data.openHours.servingTitle.text}:</strong> {data.openHours.servingText.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="">No data</div>
                    )}
                </div>
            )}
        </div>
    );
}