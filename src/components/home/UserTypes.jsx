import { FaCode } from "react-icons/fa";

const userTypes = [
    {
        title: 'Developers',
        description: 'Track coding tasks, manage sprints, and collaborate on projects seamlessly.',
        Icon: <FaCode />
    },
    {
        title: 'Corporate Professionals',
        description: 'Organize meetings, manage deadlines, and enhance team productivity.',
        Icon: <FaCode />
    },
    {
        title: 'Bankers',
        description: 'Keep track of financial tasks, client meetings, and regulatory deadlines.',
        Icon: <FaCode />
    },
    {
        title: 'Students',
        description: 'Plan study schedules, manage assignments, and stay on top of academic goals.',
        Icon: <FaCode />
    },
    {
        title: 'Freelancers',
        description: 'Organize projects, track time, and manage client communications efficiently.',
        Icon: <FaCode />
    },
    {
        title: 'Entrepreneurs',
        description: 'Plan business strategies, manage teams, and streamline daily operations.',
        Icon: <FaCode />
    },
];

const UserTypes = () => {
    return (
        <section className="pb-12 pt-20 bg-gray-100">
            <div className="w-11/12 max-w-[1440px] mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Who Uses Talika?</h2>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-10">
                    {userTypes.map((userType, index) => (
                        <div key={index} className="card bg-white shadow-xl">
                            <div className="card-body items-center text-center">
                                <div className="flex justify-center text-xl mb-2">
                                    {userType.Icon}
                                </div>
                                <h3 className="card-title text-xl font-semibold">{userType.title}</h3>
                                <p>{userType.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserTypes;
