import CustomInput from "@/components/CustomInput";
import AvatarSelect from "@/components/AvatarSelect";
import React, { useState } from "react";

function PsychologySurvey() {
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            q1: q1,
            q2: q2,
            q3: q3,
        };
        fetch("/submit-psychology-survey", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <form className="login-box" onSubmit={handleSubmit}>
                <CustomInput
                    inputType={"text"}
                    setInputValue={setQ1}
                    inputValue={q1}
                    label={"How are you feeling?"}
                />
                <br />
                <CustomInput
                    inputType={"text"}
                    setInputValue={setQ2}
                    inputValue={q2}
                    label={"What made you happy today?"}
                />
                <br />
                <CustomInput
                    inputType={"text"}
                    setInputValue={setQ3}
                    inputValue={q3}
                    label={
                        "What do you feel is missing from your life or what brings you joy?"
                    }
                />
                <br />
                <div className="user-box">
                    <label>Select your avatar</label>
                </div>
                <AvatarSelect />
                <br />
                <button className="custom-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PsychologySurvey;
