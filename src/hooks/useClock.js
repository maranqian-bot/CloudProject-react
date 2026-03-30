import { useEffect, useState } from "react";
import {
    getCurrentDateLabel,
    getDisplayTime,
    getKoreanTodayLabel,
} from "../utils/dashboardUtils";

export const useClock = () => {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timerId = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            window.clearInterval(timerId);
        };
    }, []);

    const { currentTime, meridiem } = getDisplayTime(now);

    return {
        now,
        currentYear: now.getFullYear(),
        todayLabel: getKoreanTodayLabel(now),
        currentTime,
        meridiem,
        currentDateLabel: getCurrentDateLabel(now),
    };
};