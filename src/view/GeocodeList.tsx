import React from "react";
import { Geocode } from "~Geocode";
import Link from "./Link";
import styled from "styled-components";
import { LinkList } from "./LinkList";
import { useTranslation } from "react-i18next";

export const GeocodeList = ({
    geocodes,
    isFetching,
    selectGeocode
}: {
    geocodes: Geocode[];
    isFetching: boolean;
    selectGeocode: (geocode: Geocode) => void;
}) => {
    const { t, i18n } = useTranslation();
    if (!isFetching && geocodes.length == 0) {
        return null;
    }
    if (isFetching) {
        return (
            <StyledGeocodeList>
                <div className="message">
                    {t("geocodeListLoading", "Loading...")}
                </div>
            </StyledGeocodeList>
        );
    } else {
        return (
            <StyledGeocodeList>
                <LinkList>
                    {geocodes.map((g, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    className="row"
                                    active={false}
                                    onClick={() => {
                                        selectGeocode(g);
                                    }}
                                >
                                    {g.name}
                                </Link>
                            </li>
                        );
                    })}
                </LinkList>
            </StyledGeocodeList>
        );
    }
};

const StyledGeocodeList = styled.div`
    position: absolute;
    z-index: 10000000000000;
    color: #000;
    background-color: #fff;
    width: 100%;
`;
