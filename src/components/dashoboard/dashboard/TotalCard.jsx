const TotalCard = ({info, Icon}) => {
    const {bg2, bg1, color, name, value} = info;

    return (
        <div className={`${bg1} flex items-center gap-4 p-6 rounded-xl`}>
            <div className="">
                <span className={`${bg2} flex justify-center items-center p-3 w-fit rounded-full`}>
                    <Icon className={`${color}`} size={40} />
                </span>
            </div>
            <div className="text-[#888]">
                <h5 className="text-sm">{name}</h5>
                <h2 className="text-2xl font-semibold text-[#666]">{value}</h2>
            </div>
        </div>
    )
};

export default TotalCard