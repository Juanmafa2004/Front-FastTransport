// eslint-disable-next-line react/prop-types
export const UserProfile = ({ avatar, role, email }) => {
  return (
    <div className="w-full flex items-center ">
      <div className="w-[20%] flex justify-center ml-1">
        <div className="w-[40px] h-[40px] bg-[#111215] rounded-full overflow-hidden flex items-center justify-center">
          <img src={avatar} alt={name} className="w-auto h-auto object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full mx-2">
        <div className="text-black text-[0.680rem] font-montserrat font-bold">
          {email}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-start w-full ">
            <span className="text-black text-[0.6rem] bg-status rounded-[2px] w-[66%] text-center font-montserrat font-bold">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
