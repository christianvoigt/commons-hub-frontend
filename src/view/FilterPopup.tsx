import * as React from "react";
import { Popup } from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { UIActions } from "~state/UIActions";
import { CHState } from "~index";
import Switch from "./Switch";
import { useForm } from "./useForm";
import styled from "styled-components";
import { SelectOptions } from "./SelectOptions";
import { ItemQueryActions } from "~state/ItemQueryActions";
import { RouteActions } from "~state/RouteActions";
import { Button } from "./Button";
import { metadata } from "./metadata";
import { ItemQuery } from "~state/ItemQuery";
import { useTranslation } from "react-i18next";

export const FilterPopup = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const itemQuery = useSelector((s: CHState) => s.itemQuery);
    const resetValues = {
        itemType: "",
        onlyNonCommercial: false,
        minLoadCapacity: "",
        nrOfWheels: "",
        minSeatsForChildren: "",
        minBoxLength: "",
        minBoxHeight: "",
        minBoxWidth: "",
        maxBikeLength: "",
        maxBikeHeight: "",
        maxBikeWidth: ""
    };
    metadata.features.reduce((acc, f, index) => {
        acc[f.id] = false;
        return acc;
    }, resetValues);
    const initialValues = {
        itemType: itemQuery.itemType ? itemQuery.itemType : "",
        onlyNonCommercial: itemQuery.onlyNonCommercial,
        minLoadCapacity: itemQuery.minLoadCapacity
            ? itemQuery.minLoadCapacity
            : "",
        nrOfWheels: itemQuery.nrOfWheels ? itemQuery.nrOfWheels : "",
        minSeatsForChildren: itemQuery.minSeatsForChildren
            ? itemQuery.minSeatsForChildren
            : "",
        minBoxLength: itemQuery.minBoxDimensions
            ? itemQuery.minBoxDimensions.length
            : "",
        minBoxWidth: itemQuery.minBoxDimensions
            ? itemQuery.minBoxDimensions.width
            : "",
        minBoxHeight: itemQuery.minBoxDimensions
            ? itemQuery.minBoxDimensions.height
            : "",
        maxBikeLength: itemQuery.maxBikeDimensions
            ? itemQuery.maxBikeDimensions.length
            : "",
        maxBikeWidth: itemQuery.maxBikeDimensions
            ? itemQuery.maxBikeDimensions.width
            : "",
        maxBikeHeight: itemQuery.maxBikeDimensions
            ? itemQuery.maxBikeDimensions.height
            : ""
    };
    metadata.features.reduce((acc, f, index) => {
        acc[f.id] = itemQuery.features
            ? itemQuery.features.indexOf(f.id) != -1
            : false;
        return acc;
    }, initialValues);
    const {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        reset
    } = useForm({
        initialValues,
        onSubmit({ values, errors }) {
            const features = metadata.features
                .filter((f, i) => values[f.id] === true)
                .map(f => f.id);
            const itemType =
                values["itemType"] !== "" ? values["itemType"] : null;
            const newQuery: ItemQuery = {
                long: itemQuery.long,
                lat: itemQuery.lat,
                from: itemQuery.from,
                to: itemQuery.to,
                address: itemQuery.address
            };
            if (itemType) {
                newQuery.itemType = itemType;
            }
            if (features.length > 0) {
                newQuery.features = features;
            }
            if (values["onlyNonCommercial"]) {
                newQuery.onlyNonCommercial = true;
            }
            if (values["nrOfWheels"] && values["nrOfWheels"] != "") {
                newQuery.nrOfWheels = values["nrOfWheels"];
            }
            if (
                values["minSeatsForChildren"] &&
                values["minSeatsForChildren"] != ""
            ) {
                newQuery.minSeatsForChildren = values["minSeatsForChildren"];
            }
            if (values["minLoadCapacity"] && values["minLoadCapacity"] != "") {
                newQuery.minLoadCapacity = values["minLoadCapacity"];
            }
            if (
                (values["minBoxLength"] && values["minBoxLength"] != "") ||
                (values["minBoxHeight"] && values["minBoxHeight"] != "") ||
                (values["minBoxWidth"] && values["minBoxWidth"] != "")
            ) {
                newQuery.minBoxDimensions = {
                    length: values["minBoxLength"] || 0,
                    width: values["minBoxWidth"] || 0,
                    height: values["minBoxHeight"] || 0
                };
            }
            if (
                (values["maxBikeLength"] && values["maxBikeLength"] != "") ||
                (values["maxBikeHeight"] && values["maxBikeHeight"] != "") ||
                (values["maxBikeWidth"] && values["maxBikeWidth"] != "")
            ) {
                newQuery.maxBikeDimensions = {
                    length: values["maxBikeLength"] || 0,
                    width: values["maxBikeWidth"] || 0,
                    height: values["maxBikeHeight"] || 0
                };
            }
            dispatch(RouteActions.resultsFromItemQuery(newQuery));
            dispatch(UIActions.showFilters(false));
        },
        validate(values) {}
    });
    return (
        <Popup
            title={t("filterPopupFilterResults", "Filter search results")}
            onCancel={() => dispatch(UIActions.showFilters(false))}
            onSubmit={handleSubmit}
        >
            <h4>{t("filterPopupSearch", "Search for a specific item type")}</h4>
            <SelectOptions
                id="itemType"
                onChange={handleChange}
                value={values.itemType}
            >
                <option key="no-item-type" value="">
                    All
                </option>
                {metadata.itemType.map((iT: { id: string; name: string }) => {
                    return (
                        <option key={iT.id} value={iT.id}>
                            {iT.name}
                        </option>
                    );
                })}
            </SelectOptions>
            <StyledFormSection>
                <Switch
                    id="onlyNonCommercial"
                    switchTitle={t(
                        "filterPopupOnlyNonCommercial",
                        "Only non-commercial projects"
                    )}
                    checked={values["onlyNonCommercial"]}
                    onToggleChange={handleChange}
                />
            </StyledFormSection>
            <StyledFormSection>
                <h4>{t("filterPopupNrOfWheels", "Number of Wheels:")}</h4>
                <StyledInlineNumberInput
                    type="number"
                    id="nrOfWheels"
                    name="nrOfWheels"
                    value={values["nrOfWheels"]}
                    onChange={handleChange}
                />
            </StyledFormSection>
            <StyledFormSection>
                <h4>
                    {t(
                        "filterMinimumSeatsForChildren",
                        "Minimum Seats for Children:"
                    )}
                </h4>
                <StyledInlineNumberInput
                    type="number"
                    id="minSeatsForChildren"
                    name="minSeatsForChildren"
                    value={values["minSeatsForChildren"]}
                    onChange={handleChange}
                />
            </StyledFormSection>
            <StyledFormSection>
                <h4>
                    {t(
                        "filterPopupMinimumLoadCapacity",
                        "Minimum Load Capacity:"
                    )}
                </h4>
                <StyledInlineNumberInput
                    type="number"
                    id="minLoadCapacity"
                    name="minLoadCapacity"
                    value={values["minLoadCapacity"]}
                    onChange={handleChange}
                />{" "}
                kg
            </StyledFormSection>
            <StyledFormSection>
                <h4>
                    {" "}
                    {t(
                        "filterPopupMaximumBoxDimensions",
                        "Maximum Bike Dimensions:"
                    )}
                </h4>
                <StyledInlineNumberInput
                    type="number"
                    id="maxBikeLength"
                    title="length"
                    placeholder="length"
                    name="maxBikeLength"
                    value={values["maxBikeLength"]}
                    onChange={handleChange}
                />{" "}
                x{" "}
                <StyledInlineNumberInput
                    type="number"
                    id="maxBikeWidth"
                    name="maxBikeWidth"
                    title="width"
                    placeholder="width"
                    value={values["maxBikeWidth"]}
                    onChange={handleChange}
                />{" "}
                x{" "}
                <StyledInlineNumberInput
                    type="number"
                    id="maxBikeHeight"
                    name="maxBikeHeight"
                    title="height"
                    placeholder="height"
                    value={values["maxBikeHeight"]}
                    onChange={handleChange}
                />{" "}
                cm
            </StyledFormSection>
            <StyledFormSection>
                <h4>
                    {" "}
                    {t(
                        "filterPopupMinimumBoxDimensions",
                        "Minimum Box Dimensions:"
                    )}
                </h4>
                <StyledInlineNumberInput
                    type="number"
                    id="minBoxLength"
                    title="length"
                    placeholder="length"
                    name="minBoxLength"
                    value={values["minBoxLength"]}
                    onChange={handleChange}
                />{" "}
                x{" "}
                <StyledInlineNumberInput
                    type="number"
                    id="minBoxWidth"
                    name="minBoxWidth"
                    title="width"
                    placeholder="width"
                    value={values["minBoxWidth"]}
                    onChange={handleChange}
                />{" "}
                x{" "}
                <StyledInlineNumberInput
                    type="number"
                    id="minBoxHeight"
                    name="minBoxHeight"
                    title="height"
                    placeholder="height"
                    value={values["minBoxHeight"]}
                    onChange={handleChange}
                />{" "}
                cm
            </StyledFormSection>
            <StyledFormSection>
                <h4>
                    {t("filterPopupRequiredFeatures", "Required Features:")}
                </h4>
                {metadata.features.map(
                    (f: { id: string; name: string }, index) => {
                        const id = f.id;
                        return (
                            <Switch
                                key={id}
                                id={id}
                                switchTitle={f.name}
                                checked={values[id]}
                                onToggleChange={handleChange}
                            />
                        );
                    }
                )}
            </StyledFormSection>
            <Button
                onClick={() => reset(resetValues)}
                title="Reset"
                type="button"
            >
                {t("filterPopupRemoveFilters", "Remove All Filters")}
            </Button>
        </Popup>
    );
};
const StyledInput = styled.input`
    padding: 0.5em;
`;
const StyledFormSection = styled.section`
    margin-bottom: 3rem;
    padding: 0;
`;
const StyledInlineNumberInput = styled(StyledInput)`
    display: inline-block;
    max-width: 6em;
    text-align: right;
`;
