import React from "react";
import { Item } from "~Item";
import styled from "styled-components";
import { BookButton } from "./Button";
import { PropertyList } from "./PropertyList";
import { featureLabels, itemTypeLabels } from "./metadata";
import { useTranslation } from "react-i18next";

export const ItemCard = ({ item }: { item: Item }) => {
    const { t, i18n } = useTranslation();
    if (!item) {
        return <></>;
    }
    return (
        <ItemCardStyled>
            <header>
                <h3>{item.name}</h3>
            </header>
            <section>
                <p>{item.description}</p>
                <PropertyList>
                    <dt>Item Type: </dt>
                    <dd>{itemTypeLabels[item.itemType]}</dd>
                    {item.features && (
                        <>
                            <dt>Features:</dt>
                            <dd>
                                <ul>
                                    {item.features.map((f, i) => (
                                        <li className="feature" key={"f" + i}>
                                            {featureLabels[f]}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </>
                    )}
                    <dt>Commercial</dt>
                    <dd>
                        {item.isCommercial
                            ? t("itemCardCommercialYes", "yes")
                            : t("itemCardCommercialNo", "no")}
                    </dd>
                    <dt>Load Capacity</dt>
                    <dd>{item.loadCapacity} kg</dd>
                    {item.boxDimensions ? (
                        <>
                            <dt>Box Dimensions</dt>
                            <dd>
                                {item.boxDimensions.width} x{" "}
                                {item.boxDimensions.height} x{" "}
                                {item.boxDimensions.length} cm
                            </dd>
                        </>
                    ) : null}
                    {item.project ? (
                        <>
                            <dt>Project</dt>
                            <dd>
                                <a href={item.project.url}>
                                    {item.project.name}
                                </a>
                            </dd>
                        </>
                    ) : null}
                </PropertyList>
            </section>
            <footer>
                <BookButton
                    text={t("itemCardBook", "Book ") + item.name}
                    href={item.url}
                />
            </footer>
        </ItemCardStyled>
    );
};

const ItemCardStyled = styled.div`
    margin-left: -1rem;
    margin-right: -1rem;
    border-bottom: 1px solid #bebebe;
    background-color: #fff;
    background-color: #efefef;
    &:last-child {
        border-bottom: 0;
    }
    h3 {
        margin: 0;
    }
    dd ul {
        padding-left: 1em;
        margin: 0;
    }
    section {
        padding: 0rem 1rem 1rem;
    }
    header {
        background-color: #efefef;
        padding: 1rem 1rem;
    }
    footer {
        padding: 0 1rem 1rem;
    }
`;
