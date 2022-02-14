import Image from "next/image";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { addPostState } from "../../utils/atoms/addPostState";
import { useAuth } from "../../utils/AuthProvider";
import {
  HomeIcon,
  ChatIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  ChatIcon as ChatIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import Icons from "./Icons";

function Right() {
  const [activeIcons, setActiveIcons] = useState({
    home: true,
    chat: false,
    activity: false,
  });
  const setPostModalOpen = useSetRecoilState(addPostState);
  const { user, signOut } = useAuth();
  const handleChangeChange = (title: string) => {
    switch (title) {
      case "home":
        setActiveIcons({
          home: true,
          chat: false,
          activity: false,
        });
        break;
      case "chat":
        setActiveIcons({
          home: false,
          chat: true,
          activity: false,
        });
        break;
      case "activity":
        setActiveIcons({
          home: false,
          chat: false,
          activity: true,
        });
        break;

      default:
        break;
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Icons
        Icon={activeIcons.home ? HomeIconFilled : HomeIcon}
        title="home"
        handleStateChange={handleChangeChange}
      />
      <Icons
        Icon={activeIcons.chat ? ChatIconFilled : ChatIcon}
        title="chat"
        handleStateChange={handleChangeChange}
      />
      <Icons
        Icon={PlusCircleIcon}
        title="post"
        handleStateChange={handleChangeChange}
        handleClick={() => setPostModalOpen(true)}
      />
      <Icons
        Icon={activeIcons.activity ? HeartIconFilled : HeartIcon}
        title="activity"
        handleStateChange={handleChangeChange}
      />
      <div
        aria-label="logout"
        role={"button"}
        className="rounded-full flex items-start justify-center cursor-pointer"
        onClick={logout}
      >
        <Image
          priority
          layout="fixed"
          height={25}
          width={25}
          src={
            user?.photoURL ||
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          }
          alt="profile"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Right;
