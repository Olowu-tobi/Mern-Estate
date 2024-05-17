import { useEffect } from "react";
import Header from "../Components/Header";
import { useUser } from "../features/hooks/useUser";

function MainLayout({ children }) {
  const { user } = useUser();

  useEffect(() => {
    const fetch = async () => {
      await user();
    };
    fetch();
  }, []);

  return (
    <div className="bg-[rgb(241,245,241)] h-screen">
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
