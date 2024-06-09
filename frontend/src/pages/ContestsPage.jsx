import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import formatDate from "../utils/formatDate";
import Spinner from "../components/spinner";

const ContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [activeTab, setActiveTab] = useState("ongoing");
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("https://codeforces.com/api/contest.list");
        const data = await response.json();
        if (data.status === "OK") {
          setContests(data.result);
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchContests();
  }, []);

  const filterContests = (type) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    switch (type) {
      case "ongoing":
        return contests.filter(contest => new Date(contest.startTimeSeconds * 1000) <= now && contest.phase === 'CODING');
      case "today":
        return contests.filter(contest => new Date(contest.startTimeSeconds * 1000) >= todayStart && new Date(contest.startTimeSeconds * 1000) < todayEnd);
      case "tomorrow":
        return contests.filter(contest => new Date(contest.startTimeSeconds * 1000) >= todayEnd && new Date(contest.startTimeSeconds * 1000) < tomorrowEnd);
      case "later":
        return contests.filter(contest => new Date(contest.startTimeSeconds * 1000) >= tomorrowEnd);
      default:
        return contests;
    }
  };

  if(loading){
    return <Spinner/>
  }

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      {contests.length===0 && <div>Error fetching contests . Please Try again Later </div> }
      <div className="container mx-auto p-4 min-h-screen bg-background text-primary_text">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="contest_tabs"
            role="tab"
            className="tab hover:bg-border border-secondary hover:text-primary"
            aria-label="Ongoing"
            onClick={() => setActiveTab("ongoing")}
            defaultChecked={activeTab === "ongoing"}
          />
          <div className="tab-content bg-background border-primary_text/50 rounded-box p-6">
            {filterContests(activeTab).map((contest) => (
              <div key={contest.id} className="mb-4 p-4 border border-secondary rounded-lg shadow-lg">
                <a
                  href={`https://codeforces.com/contest/${contest.id}`}
                  className="text-primary hover:underline text-lg sm:text-xl font-semibold hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contest.name}
                </a>
                <p>Start Time: {formatDate(new Date(contest.startTimeSeconds * 1000))}</p>
                <p>Duration: {contest.durationSeconds / 3600} hours</p>
              </div>
            ))}
            {filterContests(activeTab).length === 0 && <div>No Ongoing Contests</div> }
          </div>

          <input
            type="radio"
            name="contest_tabs"
            role="tab"
            className="tab hover:bg-border border-secondary hover:text-primary"
            aria-label="Today"
            onClick={() => setActiveTab("today")}
            defaultChecked={activeTab === "today"}
          />
          <div className="tab-content bg-background border-primary_text/50 rounded-box p-6">
            {filterContests(activeTab).map((contest) => (
              <div key={contest.id} className="mb-4 p-4 border border-secondary rounded-lg shadow-lg">
                <a
                  href={`https://codeforces.com/contest/${contest.id}`}
                  className="text-primary hover:underline text-lg sm:text-xl font-semibold hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contest.name}
                </a>
                <p>Start Time: {formatDate(new Date(contest.startTimeSeconds * 1000))}</p>
                <p>Duration: {contest.durationSeconds / 3600} hours</p>
              </div>
            ))}
            {filterContests(activeTab).length === 0 && <div>No contests Today</div> }
            </div>

          <input
            type="radio"
            name="contest_tabs"
            role="tab"
            className="tab hover:bg-border border-secondary hover:text-primary"
            aria-label="Tomorrow"
            onClick={() => setActiveTab("tomorrow")}
            defaultChecked={activeTab === "tomorrow"}
          />
          <div className="tab-content bg-background border-primary_text/50 rounded-box p-6">
            {filterContests(activeTab).map((contest) => (
              <div key={contest.id} className="mb-4 p-4 border border-secondary rounded-lg shadow-lg">
                <a
                  href={`https://codeforces.com/contest/${contest.id}`}
                  className="text-primary hover:underline text-lg sm:text-xl font-semibold hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contest.name}
                </a>
                <p>Start Time: {formatDate(new Date(contest.startTimeSeconds * 1000))}</p>
                <p>Duration: {contest.durationSeconds / 3600} hours</p>
              </div>
            ))}
            {filterContests(activeTab).length === 0 && <div>No contests Tommorow</div> }
          </div>

          <input
            type="radio"
            name="contest_tabs"
            role="tab"
            className="tab hover:bg-border border-secondary hover:text-primary"
            aria-label="Later"
            onClick={() => setActiveTab("later")}
            defaultChecked={activeTab === "later"}
          />
          <div className="tab-content bg-background border-primary_text/50 rounded-box p-6">
            {filterContests(activeTab).map((contest) => (
              <div key={contest.id} className="mb-4 p-4 border border-secondary rounded-lg shadow-lg">
                <a
                  href={`https://codeforces.com/contest/${contest.id}`}
                  className="text-primary hover:underline text-lg sm:text-xl font-semibold hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contest.name}
                </a>
                <p>Start Time: {formatDate(new Date(contest.startTimeSeconds * 1000))}</p>
                <p>Duration: {contest.durationSeconds / 3600} hours</p>
              </div>
            ))}
            {filterContests(activeTab).length === 0 && <div>No contests later</div> }
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestsPage;
