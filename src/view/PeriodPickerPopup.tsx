import * as React from "react";
import { Popup } from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { UIActions } from "~state/UIActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CHState } from "~index";
import moment = require("moment");
import { Button } from "./Button";
import { ItemQueryActions } from "~state/ItemQueryActions";
import { toDateStr } from "../DateString";
import { RouteActions } from "~state/RouteActions";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const PeriodPickerPopup = () => {
    const { t, i18n } = useTranslation();
    const itemQuery = useSelector((s: CHState) => s.itemQuery);
    const dispatch = useDispatch();
    const today = moment().startOf("day");
    const inTwoWeeks = moment()
        .startOf("day")
        .add(2, "weeks");
    const [startDate, setStartDate] = React.useState(
        moment(itemQuery.from, "YYYY-MM-DD").toDate()
    );
    const [endDate, setEndDate] = React.useState(
        moment(itemQuery.to, "YYYY-MM-DD").toDate()
    );

    return (
        <Popup
            title={t(
                "periodPickerPopupSetPeriod",
                "Set the period items should be available in"
            )}
            onCancel={() => {
                dispatch(UIActions.showPeriodpicker(false));
            }}
            onSubmit={() => {
                dispatch(
                    RouteActions.resultsFromItemQuery({
                        ...itemQuery,
                        from: toDateStr(startDate),
                        to: toDateStr(endDate)
                    })
                );
                dispatch(UIActions.showPeriodpicker(false));
            }}
        >
            <h4>{t("periodPickerPopupSelectDay", "Select a day:")}</h4>
            <StyledDatePicker>
                <DatePicker
                    inline
                    selected={startDate}
                    onChange={date => {
                        setStartDate(date);
                        setEndDate(date);
                    }}
                    minDate={today.toDate()}
                    maxDate={inTwoWeeks.toDate()}
                    startDate={startDate}
                    endDate={endDate}
                />
            </StyledDatePicker>
            <Button
                onClick={e => {
                    setStartDate(today.toDate());
                    setEndDate(inTwoWeeks.toDate());
                    e.preventDefault();
                }}
            >
                {t("periodPickerPopupWholePeriod", "Select the whole period")}
            </Button>
            <p>
                {t(
                    "periodPickerPopupExplanation",
                    "Velogistics currently only keeps track of daily bike availability for the next two weeks. If you want to plan further ahead, please visit the homepage of the bike you are interested in."
                )}
            </p>
        </Popup>
    );
};
const StyledDatePicker = styled.div`
    .react-datepicker {
        border: 0;
        border-radius: 0;
        margin-bottom: 2rem;
    }
    .react-datepicker__header {
        background-color: ${p => p.theme.headerBgColor};
        border-bottom: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header,
    .react-datepicker__day-name {
        color: #fff;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range {
        background-color: ${p => p.theme.mainColor1Light};
        &:hover {
            background-color: ${p => p.theme.mainColor2};
        }
    }
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
        width: 2rem;
        line-height: 2rem;
    }
`;
