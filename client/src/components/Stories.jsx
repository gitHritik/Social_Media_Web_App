import { useContext } from "react";
import { AuthContext } from "./../context/authContext";

const Stories = () => {
    const { currentUser } = useContext(AuthContext);

    // TEMPORARY
    const stories = [
        {
            id: 1,
            name: "Loream 1",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 2,
            name: "Loream 2",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 3,
            name: "Loream 3",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 4,
            name: "Loream 4",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];

    return (
        <div className="flex gap-3 h-[200px] mb-8 overflow-x-auto scrollbar-hide">
            {/* Current User Story */}
            <div className="relative min-w-[120px] sm:min-w-[150px] md:min-w-0 flex-1 overflow-hidden rounded-[10px]">
                <img
                    src={`/uploads/${currentUser.profilePic}`}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                />
                {/* Name */}
                <span className="absolute bottom-[10px] left-[10px] text-white font-medium text-sm sm:text-base">
                    {currentUser.name}
                </span>
                {/* Add Button */}
                <button className="absolute bottom-[40px] left-[10px] m-auto bg-[#5271ff] text-white rounded-full w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] flex items-center justify-center text-[22px] sm:text-[26px] border-0 cursor-pointer">
                    +
                </button>
            </div>

            {/* Other Stories */}
            {stories.map((story) => (
                <div
                    key={story.id}
                    className="relative min-w-[120px] sm:min-w-[150px] md:min-w-0 flex-1 overflow-hidden rounded-[10px]"
                >
                    <img
                        src={story.img}
                        alt={story.name}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-[10px] left-[10px] text-white font-medium text-sm sm:text-base">
                        {story.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
