import { IFetchState } from "./IFetchState";
import { IDataTable } from "./IDataTable";
import {
    FilterAvailableItemsAction,
    FILTER_AVAILABLE_ITEMS
} from "./FilterAvailableItemsAction";
import { Location } from "~Location";

export const filterAvailableItemsReducer = (
    state: IFetchState<IDataTable<Location>> = null,
    action: FilterAvailableItemsAction
) => {
    switch (action.type) {
        case FILTER_AVAILABLE_ITEMS: {
            const { itemQuery, items } = action.payload;
            const oldLocations = state.data.byId;
            const newLocations = state.data.allIds.reduce(
                (newLocs, id) => {
                    const location: Location = oldLocations[id];
                    const filteredItems = location.availableItems
                        ? location.availableItems.filter(id => {
                              const item = items.byId[id];
                              if (
                                  itemQuery.itemType !== null &&
                                  item.itemType !== itemQuery.itemType
                              ) {
                                  return false;
                              }
                              if (itemQuery.features !== null) {
                                  if (
                                      itemQuery.features.find(
                                          f => item.features.indexOf(f) == -1
                                      )
                                  ) {
                                      return false;
                                  }
                              }
                              if (
                                  itemQuery.onlyNonCommercial &&
                                  item.isCommercial
                              ) {
                                  return false;
                              }
                              if (
                                  itemQuery.minLoadCapacity &&
                                  item.loadCapacity < itemQuery.minLoadCapacity
                              ) {
                                  return false;
                              }
                              if (
                                  itemQuery.nrOfWheels &&
                                  (item.nrOfWheels < itemQuery.nrOfWheels ||
                                      item.nrOfWheels > itemQuery.nrOfWheels)
                              ) {
                                  return false;
                              }
                              if (
                                  itemQuery.minSeatsForChildren &&
                                  item.seatsForChildren <
                                      itemQuery.minSeatsForChildren
                              ) {
                                  return false;
                              }
                              if (
                                  itemQuery.minBoxDimensions !== null &&
                                  item.boxDimensions
                              ) {
                                  if (
                                      item.boxDimensions.width <
                                          itemQuery.minBoxDimensions.width ||
                                      item.boxDimensions.height <
                                          itemQuery.minBoxDimensions.height ||
                                      item.boxDimensions.length <
                                          itemQuery.minBoxDimensions.length
                                  ) {
                                      return false;
                                  }
                              }
                              if (
                                  itemQuery.maxBikeDimensions !== null &&
                                  item.bikeDimensions
                              ) {
                                  if (
                                      item.bikeDimensions.width >
                                          itemQuery.maxBikeDimensions.width ||
                                      item.bikeDimensions.height >
                                          itemQuery.maxBikeDimensions.height ||
                                      item.bikeDimensions.length >
                                          itemQuery.maxBikeDimensions.length
                                  ) {
                                      return false;
                                  }
                              }
                              return true;
                          })
                        : null;
                    newLocs[id] = { ...location, filteredItems };
                    return newLocs;
                },
                {} as {
                    [key: string]: Location;
                }
            );
            return {
                ...state,
                data: { ...state.data, byId: newLocations }
            };
        }
        default:
            return state;
    }
};
