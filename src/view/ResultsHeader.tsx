import * as React from "react";
import { Button } from "./Button";
import { UIActions } from "~state/UIActions";
import { Popup } from "./Popup";
import { PropertyList } from "./PropertyList";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CHState } from "~index";
// import { PeriodPickerPopup } from "./PeriodPickerPopup";
// import { FilterPopup } from "./FilterPopup";
import { featureLabels, itemTypeLabels } from "./metadata";
import moment = require("moment");
import { useTranslation } from "react-i18next";

export const ResultsHeader = ({ nrOfItems, nrOfLocations }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const itemQuery = useSelector((s: CHState) => s.itemQuery);
    let filterButtonLabel = t("resultsHeaderAddFilter", "Add Filter");
    if (itemQuery.itemType) {
        filterButtonLabel = itemTypeLabels[itemQuery.itemType];
    }
    if (
        itemQuery.features &&
        Array.isArray(itemQuery.features) &&
        itemQuery.features.length > 0
    ) {
        if (!itemQuery.itemType) {
            filterButtonLabel = t("resultsHeaderAll", "All");
        }
        filterButtonLabel += t("resultsHeaderAll", " with");
        itemQuery.features.forEach(
            (f, i) =>
                (filterButtonLabel +=
                    i == 0 ? " " + featureLabels[f] : ", " + f)
        );
    }
    if (itemQuery.minLoadCapacity) {
        const minLoadCapacity = t(
            "resultsHeaderMinLoadCapacity",
            "minimum load capacity"
        );
        filterButtonLabel += itemQuery.features
            ? ", " + minLoadCapacity
            : minLoadCapacity;
    }
    if (itemQuery.minBoxDimensions) {
        const minBoxDimensions = t(
            "resultsHeaderMinBoxDimensions",
            "minimum box dimensions"
        );
        filterButtonLabel += itemQuery.features
            ? ", " + minBoxDimensions
            : minBoxDimensions;
    }
    if (itemQuery.onlyNonCommercial) {
        filterButtonLabel += t(
            "resultsHeaderNonCommercial",
            " from non-commercial project"
        );
    }
    let periodButtonLabel: string = itemQuery.from;
    const from = moment(itemQuery.from);
    const to = moment(itemQuery.to);
    if (to.diff(from, "days") == 14) {
        periodButtonLabel = t(
            "resultsHeaderNextTwoWeeks",
            "the next two weeks"
        );
    } else {
        periodButtonLabel = itemQuery.from + " - " + itemQuery.to;
    }
    return (
        <StyledResultsHeader>
            <h2>
                {t("resultsHeaderFoundItems", {
                    defaultValue: "Found {{count}} available cargobikes",
                    count: nrOfItems
                }) +
                    t("resultsHeaderAtLocations", {
                        defaultValue: " at {{count}} locations",
                        count: nrOfLocations
                    })}
            </h2>
            <PropertyList>
                <dt>
                    {t("resultsHeaderAvailableDuring", "Available during: ")}
                </dt>
                <dd>
                    {" "}
                    <Button
                        onClick={() =>
                            dispatch(UIActions.showPeriodpicker(true))
                        }
                    >
                        {periodButtonLabel}
                    </Button>
                </dd>
            </PropertyList>
            <PropertyList>
                <dt>{t("resultsHeaderFilter", "Filter: ")}</dt>
                <dd>
                    <Button
                        onClick={() => dispatch(UIActions.showFilters(true))}
                    >
                        {filterButtonLabel}
                    </Button>
                </dd>
            </PropertyList>
        </StyledResultsHeader>
    );
};

const StyledResultsHeader = styled.header`
    padding: 1rem;
    background-color: #fff;
    margin-bottom: 3px;
    h2 {
        margin-top: 0.5rem;
    }
    dl {
        margin: 0;
        dt,
        dd {
            display: flex;
            align-items: center;
            padding: 0.25rem 0;
        }
    }
`;
