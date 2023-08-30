import * as React from "react";
import { useEffect, useState } from "react";

const Calculator = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitDate, setSubmitDate] = React.useState(new Date("2023-08-29T09:00:00.000"));
    const [turnaroundTime, setTurnaroundTime] = React.useState(1);
    const [deadline, setDeadline] = React.useState<null | Date>(null);

    useEffect(()=>{
        calculate();
    },[submitDate,turnaroundTime]);

    const convertToMilliseconds = (hours: number, minutes: number, seconds: number) => (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

    const parseSubmitDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.currentTarget.value);
        if (date.getDay() === 0 || date.getDay() === 6) {
            setErrorMessage("Submit date must be between Monday and Friday!");
        } else if (date.getHours() < 9 || date.getHours() >= 17) {
            setErrorMessage("Submit date must be between 9:00 and 17:00!");
        } else {
            setErrorMessage(null);
            setSubmitDate(new Date(date.getTime()));
        }
    };

    const parseTurnaroundTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const turnaroundTime = Number.parseInt(e.currentTarget.value);

        setTurnaroundTime(turnaroundTime);
    };

    const convertDateToString = (date: Date) => {
        const removeTimezoneOffset = new Date(date.getTime() - convertToMilliseconds(0, date.getTimezoneOffset(), 0));
        return removeTimezoneOffset.toISOString().slice(0, -8);
    };

    const calculate = () => {
        const deadline = new Date(submitDate);
        deadline.setHours(deadline.getHours() + (Number.isNaN(turnaroundTime)?0:turnaroundTime));
        setDeadline(deadline);
    };

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                {errorMessage &&
                    <h3 id='error' style={{ color: "red" }}>{errorMessage}</h3>}
                <label>
                    Submit date: <input data-testid='submit-date' id='submit-date' value={convertDateToString(submitDate)} name='submitDate' type='datetime-local' onChange={(e) => parseSubmitDate(e)}  />
                </label>
                <label>
                    Turnaround time (h): <input data-testid='turnaround-time' id="turnaround-time" value={turnaroundTime} min={0} name='turnaroundTime' type='number' onChange={(e) => parseTurnaroundTime(e)} />
                </label>
            </form>
            <h2>
                Deadline:
            </h2><span id='deadline' data-testid='deadline'>{deadline?.toString()}</span>
        </>
    );
};
export default Calculator;