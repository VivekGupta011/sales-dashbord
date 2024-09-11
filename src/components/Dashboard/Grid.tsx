"use client";
import { useState } from "react";
import { ActivityGraph } from "./ActivityGraph";
import { ScoopStation } from "./ScoopStation";
import { StatCards } from "./StatCards";
import TopBar from "./TopBar";

export const Grid = () => {
  const [selectedDate, setSelectedDate] = useState("2019-03-13");
  return (
    <>
      <TopBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="px-4 grid gap-3 grid-cols-12">
        <StatCards selectedDate={selectedDate} />
        <ActivityGraph />
        <ScoopStation />
      </div>
    </>
  );
};
