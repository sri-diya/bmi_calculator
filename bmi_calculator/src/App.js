import React, { useState } from "react";
import "./App.css";

import normalImage from "./assets/bmi_chart/normal.png";
import obeseImage from "./assets/bmi_chart/obese.png";
import underImage from "./assets/bmi_chart/under.png";
import overImage from "./assets/bmi_chart/over.png";
import normalImageMale from "./assets/bmi_chart/normalMale.png";
import obeseImageMale from "./assets/bmi_chart/obeseMale.png";
import underImageMale from "./assets/bmi_chart/underMale.png";
import overImageMale from "./assets/bmi_chart/overMale.png";

const App = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [calculateValue, setCalculateValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [gender, setGender] = useState("-999");
  const [displayImage, setDisplayImage] = useState("");

  const calculateAction = () => {
    if (gender === "-999") {
      alert("Select a gender");
      return;
    }

    if (!height || !weight) {
      alert("Fill both the values");
      return;
    }

    const bmi = Number(weight) / Number(height) ** 2;
    setCalculateValue(bmi.toFixed(2));

    if (bmi < 18.5) {
      setDisplayValue("Underweight");
      setDisplayImage(gender === "male" ? underImageMale : underImage);
    } else if (bmi >= 18.5 && bmi < 25) {
      setDisplayValue("Normal weight");
      setDisplayImage(gender === "male" ? normalImageMale : normalImage);
    } else if (bmi >= 25 && bmi < 30) {
      setDisplayValue("Overweight");
      setDisplayImage(gender === "male" ? overImageMale : overImage);
    } else {
      setDisplayValue("Obese");
      setDisplayImage(gender === "male" ? obeseImageMale : obeseImage);
    }
  };

  const resetAction = () => {
    setHeight("");
    setWeight("");
    setCalculateValue("");
    setDisplayValue("");
    setGender("-999");
    setDisplayImage("");
  };

  return (
    <div className="container">
      <div className="card calculator">
        <h2>BMI CALCULATOR</h2>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="-999">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Height (in meters)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight (in kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <div className="buttons">
          <button onClick={calculateAction}>Calculate</button>
          <button className="reset" onClick={resetAction}>Reset</button>
        </div>

        <div className="result">
          {calculateValue && <h3>Your BMI: {calculateValue}</h3>}
          {displayValue && <h3>Status: {displayValue}</h3>}
        </div>
      </div>

      <div className="card image-section">
        {displayImage ? (
          <img src={displayImage} alt="BMI status" />
        ) : (
          <p className="placeholder-text">Your BMI image will appear here</p>
        )}
      </div>
    </div>
  );
};

export default App;
