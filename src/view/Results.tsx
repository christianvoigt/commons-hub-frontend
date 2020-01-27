import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHState } from "~index";
import { Item } from "~Item";
import { IDataTable } from "~state/IDataTable";
import Map from "./Map";
import styled from "styled-components";
import { Location } from "~Location";
import Link from "./Link";
import { SelectedLocationActions } from "~state/SelectedLocationActions";
import { LocationDetails } from "./LocationDetails";
import { ResultsHeader } from "./ResultsHeader";
import console = require("console");
import { FilterPopup } from "./FilterPopup";
import { PeriodPickerPopup } from "./PeriodPickerPopup";

export const Results = () => {
    const itemsData: IDataTable<Item> = useSelector((s: CHState) =>
        s.items ? s.items.data : null
    );
    const locationsData: IDataTable<Location> = useSelector((s: CHState) =>
        s.locations ? s.locations.data : null
    );
    const selectedLocation: string | null = useSelector(
        (s: CHState) => s.selectedLocation
    );
    const { showFilters, showPeriodPicker } = useSelector((s: CHState) => s.ui);

    return (
        <StyledResults>
            <div className="left-column">
                <Locations
                    selectedLocation={selectedLocation}
                    locations={locationsData}
                />
            </div>
            <div className="right-column">
                <Map
                    markersData={
                        locationsData && locationsData.allIds
                            ? locationsData.allIds.map(
                                  id => locationsData.byId[id]
                              )
                            : []
                    }
                />
            </div>
            {showFilters ? <FilterPopup /> : null}
            {showPeriodPicker ? <PeriodPickerPopup /> : null}
        </StyledResults>
    );
};

const Locations: React.FunctionComponent<{
    locations: IDataTable<Location>;
    selectedLocation: string | null;
}> = ({ locations, selectedLocation }) => {
    const dispatch = useDispatch();
    if (!locations || !locations.allIds) {
        return <></>;
    }
    if (selectedLocation != null) {
        return (
            <>
                <Link
                    className="back-to-all row"
                    active={false}
                    onClick={() => dispatch(SelectedLocationActions.deselect())}
                >
                    <span className="arrow back" /> Back to all locations
                </Link>
                <LocationDetails
                    location={locations.byId[selectedLocation]}
                    isSelected={true}
                />
            </>
        );
    }
    const { nrOfLocations, nrOfItems } = locations.allIds.reduce(
        (acc, id) => {
            const location = locations.byId[id];
            if (location.filteredItems && location.filteredItems.length > 0) {
                acc.nrOfItems += location.filteredItems.length;
                acc.nrOfLocations++;
            }
            return acc;
        },
        { nrOfItems: 0, nrOfLocations: 0 }
    );
    return (
        <>
            <ResultsHeader
                nrOfItems={nrOfItems}
                nrOfLocations={nrOfLocations}
            />
            {locations.allIds
                .map(id => locations.byId[id])
                .filter(l => l.filteredItems && l.filteredItems.length > 0)
                .map(location => {
                    return (
                        <LocationDetails
                            key={location._id}
                            location={location}
                        />
                    );
                })}
        </>
    );
};

const StyledResults = styled.div`
    position: absolute;
    right: 0px;
    left: 0px;
    top: 100px;
    bottom: 0px;
    display: flex;
    .back-to-all {
        margin-bottom: 3px;
    }
    .left-column {
        width: 30%;
        height: 100%;
        overflow: auto;
        background-color: ${p => p.theme.headerLightBgColor};
    }
    .right-column {
        width: 70%;
        height: 100%;
        overflow: hidden;
        background-color: white;
    }
    .arrow.back {
        border: solid ${p => p.theme.mainColor1};
        border-width: 0 0.2rem 0.2rem 0;
        display: inline-block;
        padding: 0.3rem;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
`;
