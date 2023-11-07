import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { countOfWorkingHours, zero, convertingNumberBetweenTime, convertingNumberForMilliseconds, indexOfSaturday, indexOfSunday, errorMessages, startingHourOfWorkingDay, finishingHourOfWorkingDay, indexOfLastCharForDateFormatting, countOfWorkingDays, countOfNonWorkingDays } from "../helpers/constants";


const Calculator = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitDate, setSubmitDate] = useState(new Date(new Date().setHours(startingHourOfWorkingDay,zero,zero,zero))); //TODO: submit date should be now or next working minute
    const [turnaroundTime, setTurnaroundTime] = useState(zero);
    const [deadline, setDeadline] = useState<null | Date>(null);

    useEffect(() => {
        calculate();
    }, [submitDate, turnaroundTime]);

    const convertToMilliseconds = (hours: number, minutes: number, seconds: number) => (hours * convertingNumberBetweenTime * convertingNumberBetweenTime + minutes * convertingNumberBetweenTime + seconds) * convertingNumberForMilliseconds;

    const parseAndValidateSubmitDate = (e: ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.currentTarget.value);
        if (date.getDay() === indexOfSaturday || date.getDay() === indexOfSunday) {
            setErrorMessage(errorMessages.nonWorkingDay);
        } else if (date.getHours() < startingHourOfWorkingDay || date.getHours() >= finishingHourOfWorkingDay) {
            setErrorMessage(errorMessages.nonWorkingHour);
        } else {
            setErrorMessage(null);
            setSubmitDate(new Date(date.getTime()));
        }
    };

    const parseTurnaroundTime = (e: ChangeEvent<HTMLInputElement>) => {
        const turnaroundTime = Number.parseInt(e.currentTarget.value);
        setTurnaroundTime(turnaroundTime);
    };

    const convertDateToString = (date: Date) => {
        const removeTimezoneOffset = new Date(date.getTime() - convertToMilliseconds(zero, date.getTimezoneOffset(), zero));
        return removeTimezoneOffset.toISOString().slice(zero, indexOfLastCharForDateFormatting);
    };

    const calculate = () => {
        const timeOfEODinMilliseconds = convertToMilliseconds(finishingHourOfWorkingDay, zero, zero);
        const startTimeInMilliseconds = convertToMilliseconds(submitDate.getHours(), submitDate.getMinutes(), submitDate.getSeconds());
        const leftOverTimeOfDay = timeOfEODinMilliseconds - startTimeInMilliseconds;
        const calculatedDeadline = new Date(submitDate.getTime());
        let turnaroundTimeInMilliseconds = convertToMilliseconds(turnaroundTime, zero, zero);

        if (leftOverTimeOfDay > turnaroundTimeInMilliseconds) {
            //if turnaround time can be processed in the submit date's leftover work time 
            calculatedDeadline.setMilliseconds(turnaroundTimeInMilliseconds);
        } else {
            const today = 1;
            //if turnaround time exceeds the submit date's leftover work time we need to calculate the turnaround days
            const workingDayInMilliseconds = convertToMilliseconds(countOfWorkingHours, zero, zero);
            turnaroundTimeInMilliseconds -= leftOverTimeOfDay;
            let turnaroundDays = Math.floor(turnaroundTimeInMilliseconds / workingDayInMilliseconds);
            //calculate with weekends and the plus one is the filled leftover of the submit date
            turnaroundDays += Math.floor((turnaroundDays + submitDate.getDay()) / countOfWorkingDays) * countOfNonWorkingDays + today;
            calculatedDeadline.setDate(calculatedDeadline.getDate() + turnaroundDays);
            calculatedDeadline.setHours(startingHourOfWorkingDay,zero,zero,turnaroundTimeInMilliseconds % workingDayInMilliseconds);
        }
        setDeadline(calculatedDeadline);
    };

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                {errorMessage &&
                    <h3 id='error' style={{ color: "red" }}>{errorMessage}</h3>}
                <label>
                    Submit date: <input data-testid='submit-date' id='submit-date' value={convertDateToString(submitDate)} name='submitDate' type='datetime-local' onChange={(e) => parseAndValidateSubmitDate(e)} />
                </label>
                <label>
                    Turnaround time (h): <input data-testid='turnaround-time' id="turnaround-time" value={turnaroundTime} min={zero} name='turnaroundTime' type='number' onChange={(e) => parseTurnaroundTime(e)} />
                </label>
            </form>
            <h2>
                Deadline:
            </h2><span id='deadline' data-testid='deadline'>{deadline?.toString()}</span>
        </>
    );
};
export default Calculator;