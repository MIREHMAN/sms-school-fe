const announcements = [
    {
      title: "Lorem ipsum dolor sit",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
      bgColor: "bg-lamaSkyLight",
    },
    {
      title: "Lorem ipsum dolor sit",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
      bgColor: "bg-lamaPurpleLight",
    },
    {
      title: "Lorem ipsum dolor sit",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
      bgColor: "bg-lamaYellowLight",
    },
  ];
  
  const Announcements = () => {
    return (
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Announcements</h1>
          <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {announcements.map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-md p-4`}>
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{item.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {item.date}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Announcements;
  