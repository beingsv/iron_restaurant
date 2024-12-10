import React, { useState, useEffect } from "react";

const About = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const data = await fetch("https://api.github.com/users/beingsv");
    const json = await data.json();
    setUserData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-[50%] m-auto pt-8 flex justify-between items-center">
        <div>
          <p className="text-4xl font-bold">{userData.name}</p>
          <p className="text-xl pt-6">{userData.bio}</p>
          {/* <p>Used Stacks: ReactJS, Tailwind, ContextAPI, Lazy Loading.</p> */}
          <div className="pt-4 flex gap-4">
            <div className="bg-[#7e57c2] text-white px-4 py-1 rounded-2xl hover:bg-[#5e35b1]">
              <a href={userData.html_url}>GitHub Profile</a>
            </div>
            <div className="bg-[#7e57c2] text-white px-4 py-1 rounded-2xl hover:bg-[#5e35b1]">
              <a href={userData.blog}>LinkedIn Profile</a>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={userData.avatar_url}
            alt="user"
          />
        </div>
      </div>
      <div>
        {/* P for 'About This Project'. */}
      </div>
    </div>
  );
};

export default About;
