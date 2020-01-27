import { Location } from "~Location";
import React from "react";
import Link from "./Link";
import { SelectedLocationActions } from "~state/SelectedLocationActions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CHState } from "~index";
import { ItemCard } from "./ItemCard";
import { IDataTable } from "~state/IDataTable";
import { Item } from "~Item";
import { useTranslation } from "react-i18next";

export const LocationDetails = ({ location, isSelected = false }) => {
    const { t, i18n } = useTranslation();
    if (!location) {
        return <></>;
    }
    const dispatch = useDispatch();
    const items: IDataTable<Item> = useSelector((s: CHState) => s.items.data);
    return (
        <StyledLocationDetails className={isSelected ? "selected" : ""}>
            <header className="location-header">
                <Link
                    active={false}
                    onClick={() =>
                        dispatch(SelectedLocationActions.select(location._id))
                    }
                >
                    <h3 className="location-name">
                        {t("locationDetailsItemsAt", "Items at")}{" "}
                        {location.name}
                    </h3>
                    <div className="address">{location.address}</div>
                </Link>
            </header>
            <section className="content">
                {location.filteredItems
                    ? location.filteredItems.map(id => (
                          <ItemCard key={id} item={items.byId[id]} />
                      ))
                    : null}
            </section>
        </StyledLocationDetails>
    );
};
const StyledLocationDetails = styled.div`
    padding-left: 2px;
    padding-right: 2px;
    .content {
        padding: 0 1rem;
        margin-bottom: 3px;
    }
    .location-header {
        margin: 0;
        padding: 0;
        a {
            display: block;
            margin: 0;
            padding: 1rem 1rem;
            margin: 0;
            background-color: ${p => p.theme.mainColor1};

            border-radius: 0.3rem 0.3rem 0 0;
            color: #fff;
            h3 {
                color: #fff;
                margin: 0;
            }
            &:hover {
                background-color: ${p => p.theme.mainColor1Hover};
            }
        }
        /* border-bottom: 1px solid #ddd; */
        /* border-top: 1px solid #ddd; */
    }
    &.selected {
        .location-header {
            a {
                background-color: ${p => p.theme.mainColor2};
                color: ${p => p.theme.headerBgColor};
            }
        }
    }
    /* &:last-child {
        border-bottom: 0;
    } */
`;
