import React, { useEffect, useState } from "react";

import Header from "./../../Timer/components/Header/header";
import Controls from "./../../Timer/components/Controls/controls";
import TimerDisplay from "./../../Timer/components/TimerDisplay/timerdisplay";
import Button from "./../../Timer/components/Button/button";
import Settings from "./../../Timer/components/Settings/settings";
//@ts-ignore
import timesUpSfx from "./../../Timer/sounds/timesUp.mp3";
import "./TimerPage.css";
//@ts-ignore
import useSound from "use-sound";
import { Card } from "antd";

export const TimerPage = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [timerMode, setTimerMode] = useState("pomo"); // options: pomo, short, long
  const [pomoLength, setPomoLength] = useState(25);
  const [shortLength, setShortLength] = useState(3);
  const [longLength, setLongLength] = useState(15);
  const [fontPref, setFontPref] = useState("kumbh"); // options: kumbh, roboto, space
  const [accentColor, setAccentColor] = useState("default"); // options: default, blue, purple
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("START");

  const [volume, setVolume] = useState(1);
  const [timesUp] = useSound(timesUpSfx, {
    volume: volume,
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsActive(false);
        setButtonText("");
        timesUp();
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft, timesUp]);

  const toggleSettingsVisibility = (event: any) => {
    setSettingsVisible(!settingsVisible);
  };

  const formatTimeLeft = (seconds: any) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  const calcPercentage = () => {
    if (timerMode === "pomo") {
      return (secondsLeft / (pomoLength * 60)) * 100;
    }
    if (timerMode === "short") {
      return (secondsLeft / (shortLength * 60)) * 100;
    }
    if (timerMode === "long") {
      return (secondsLeft / (longLength * 60)) * 100;
    }
  };

  return (
    <Card
      style={{
        maxHeight: "calc(100vh - 170px)",
        width: "450px",
        position: "relative",
      }}
      title="Таймер"
    >
      <div className="pomodoro-app">
        <Controls
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          setSecondsLeft={setSecondsLeft}
          pomoLength={pomoLength}
          shortLength={shortLength}
          longLength={longLength}
          setIsActive={setIsActive}
          //@ts-ignore
          buttonText={buttonText}
          setButtonText={setButtonText}
          volume={volume}
        />
        <TimerDisplay
          timerMode={timerMode}
          percentage={calcPercentage()}
          timeLeft={formatTimeLeft(secondsLeft)}
          isActive={isActive}
          setIsActive={setIsActive}
          buttonText={buttonText}
          setButtonText={setButtonText}
          volume={volume}
          setVolume={setVolume}
        />
        <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
        <Settings
          visible={settingsVisible}
          toggleSettingsVisibility={toggleSettingsVisibility}
          pomoLength={pomoLength}
          setPomoLength={setPomoLength}
          shortLength={shortLength}
          setShortLength={setShortLength}
          longLength={longLength}
          setLongLength={setLongLength}
          fontPref={fontPref}
          setFontPref={setFontPref}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          closeSettings={toggleSettingsVisibility}
          setSecondsLeft={setSecondsLeft}
          timerMode={timerMode}
        />
      </div>
    </Card>
  );
};
