import { MdOutlineStar, MdStarHalf, MdStarOutline } from "react-icons/md";

export const Rating = ({ rating }: { rating: number }) => {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(<MdOutlineStar key={`full-${i}`} />);
    }

    if (hasHalfStar) {
        stars.push(
            <span key="half" className="relative">
                <MdStarHalf />
            </span>
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<MdStarOutline />);
    }

    return <div className="flex text-xl my-1 text-yellow-500">{stars}</div>;
};