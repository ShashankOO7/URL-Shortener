import { React, useState } from "react";
import { Statistics } from "./Statistics/Statistics";
import { History } from "./History/History";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LinkInput from "./../../components/LinkInput/LinkInput";
import { ClickStream } from "./ClickStream/ClickStream";
import { Menu } from "./Menu/Menu";
import { useThemeContext } from "../../hooks/useThemeContext";
const Dashboard = () => {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState("history");
  const backgroundColor = theme === "light" ? "#f5f5f7" : "#111827";
  const renderContent = () => {
    switch (activeTab) {
      case "history":
        return <History />;
      case "clickstream":
        return <ClickStream />;
      case "statistics":
      default:
        return <Statistics />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header Section: LinkInput and Menu */}
      <header
        className="fixed top-20 left-0 right-0 z-10 shadow-sm"
        style={{ backgroundColor }}
      >
        {/* LinkInput Section */}
        <section
          className="w-full py-4 px-4 md:px-6 border-b border-gray-200 dark:border-gray-700"
          style={{ backgroundColor }}
        >
          <div className="flex justify-center items-center w-full max-w-6xl mx-auto">
            <div className="w-full md:w-4/5">
              <LinkInput />
            </div>
          </div>
        </section>
        {/* Menu Section */}
        <Menu activeTab={activeTab} onChange={setActiveTab} />
      </header>
      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto pt-[240px] md:pt-[250px]">
        <div className="flex justify-center items-start min-h-full w-full mx-auto md:px-6 pb-6">
          {renderContent()}
        </div>
      </main>
      <ThemeToggle />
    </div>
  );
};
export default Dashboard;
