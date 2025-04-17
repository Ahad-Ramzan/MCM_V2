"use client";

import React, { useEffect, useState } from "react";

// Format time as "Xd HH:MM:SS"
const formatTime = (totalSeconds) => {
  const isPast = totalSeconds < 0;
  const absSeconds = Math.abs(totalSeconds);

  const days = Math.floor(absSeconds / (24 * 3600));
  const hours = String(Math.floor((absSeconds % (24 * 3600)) / 3600)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((absSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(absSeconds % 60).padStart(2, "0");

  const formatted = `${
    days > 0 ? `${days}: ` : ""
  }${hours}:${minutes}:${seconds}`;
  return isPast ? `-${formatted}` : formatted;
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null); // initially null to skip SSR mismatch
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(targetDate);
      return Math.floor((endTime - now) / 1000); // in seconds
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!hasMounted || timeLeft === null) return null; // skip rendering until mounted

  return (
    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
      Termina em: {formatTime(timeLeft)}
    </span>
  );
};

export default CountdownTimer;
