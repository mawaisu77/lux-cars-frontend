import baseService from "../services/baseService";

export async function placeBidOnLocalCar({ localCarID, currentBid }) {
  try {
    const bidPlace = await baseService.post(`local-cars-bids/place-bid`, {
      localCarID,
      currentBid,
    });
    return bidPlace;
  } catch (err) {
    return err;
  }
}

export async function getAllBidsLocalCar({ localCarID }) {
  try {
    const allBids = await baseService.get(
      `/local-cars-bids/get-all-bids?localCarID=${localCarID}`
    );
    return allBids;
  } catch (err) {
    return err;
  }
}
