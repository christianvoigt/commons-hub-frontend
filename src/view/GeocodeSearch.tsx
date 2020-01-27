import React from "react";
import { Formik, Field } from "formik";
import styled from "styled-components";
import TextField, { FormInput, SimpleTextField } from "./TextField";
import {
  SubmitButton,
  Button,
  CurrentLocationButton,
  StyledSubmitButton,
  SearchSubmitButton
} from "./Button";
import { GeocodeSearchActions } from "~state/GeocodeSearchActions";
import { useDispatch, useSelector } from "react-redux";
import { CHState } from "~index";
import { IDataTable } from "~state/IDataTable";
import { Geocode } from "~Geocode";
import { IFetchState } from "~state/IFetchState";
import { GeocodeList } from "./GeocodeList";
import console = require("console");

interface FormValues {
  searchQuery: string;
}

const GeocodeSearch = ({ isStandalone }: { isStandalone?: boolean }) => {
  const dispatch = useDispatch();
  const selectedGeocode = useSelector<CHState, Geocode>(s => s.selectedGeocode);
  const initialValues: FormValues = {
    searchQuery: selectedGeocode ? selectedGeocode.name : ""
  };
  const geocodes = useSelector<CHState, IFetchState<Geocode[]>>(
    s => s.geocodes
  );
  const showGeocodesList = useSelector<CHState, boolean>(
    s => s.ui.showGeocodesList
  );
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values =>
          dispatch(GeocodeSearchActions.search(values.searchQuery))
        }
        render={({
          handleSubmit,
          handleChange,
          errors,
          touched,
          initialValues
        }) => (
          <StyledGeocodeSearch onSubmit={handleSubmit}>
            <div className="input-with-buttons">
              <Field
                type="text"
                name="searchQuery"
                value={initialValues.searchQuery}
                render={innerProps => (
                  <SimpleTextField
                    {...innerProps}
                    value={initialValues.searchQuery}
                    title="Search Query"
                  />
                )}
              />
              <CurrentLocationButton
                onClick={() =>
                  dispatch(GeocodeSearchActions.reverseSearchCurrentLocation())
                }
              />
              <SearchSubmitButton />
            </div>
            <div className="geocode-list-container">
              {showGeocodesList ? (
                <GeocodeList
                  geocodes={geocodes.data}
                  isFetching={geocodes.isFetching}
                  selectGeocode={(geocode: Geocode) => {
                    if (isStandalone) {
                      window.location.href = `/results/${geocode.latitude}/${geocode.longitude}`;
                    } else {
                      dispatch(GeocodeSearchActions.selectGeocode(geocode));
                    }
                  }}
                />
              ) : null}
            </div>
          </StyledGeocodeSearch>
        )}
      />
    </>
  );
};
export default GeocodeSearch;

const StyledGeocodeSearch = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  .input-with-buttons {
    display: flex;
    flex: 1;
    width: 100%;
  }
  .geocode-list-container {
    display: flex;
    width: 100%;
    position: relative;
  }
  ${FormInput} {
    flex: 1;
    margin-bottom: 0.5rem;
  }
  ${StyledSubmitButton} {
    width: auto;
    display: flex;
    color: #000;
    background-color: ${props => props.theme.mainColor2};
    margin-right: 0;
    border-radius: 0 0.2rem 0.2rem 0;

    margin-bottom: 0.5rem;
    &:hover {
      background-color: ${props => props.theme.mainColor2Hover};
    }
  }
`;
