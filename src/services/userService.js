import baseService from './baseService';

export const getProfile = async () => {
    try {
      const response = await baseService.get('user/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateProfile = async (profileData) => {
    try {
      const response = await baseService.put('user/edit-profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const getAllBids = async () => {
    try {
      const response = await baseService.get('bids/user-all-bids');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const getUserFunds = async () => {
    try {
      const response = await baseService.get('funds/get-funds');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const saveUserCars = async (id) => {
    try {
      const response = await baseService.post('saved-cars/save-car', {lot_id:id});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getUserSavedCars = async () => {
    try {
      const response = await baseService.get('saved-cars/get-users-saved-cars');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getUserSavedLocalCars = async () => {
    try {
      const response = await baseService.get('saved-cars/get-user-saved-local-cars');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getSavedIds = async () => {
    try {
      const response = await baseService.get('saved-cars/get-user-saved-cars-ids');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteSavedCar = async (id) => {
    console.log("id", id)
    try {
      const response = await baseService.put(`saved-cars/delete-car`, {lot_id:id});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getSavedLocalCarsIds = async () => {
    try {
      const response = await baseService.get('saved-cars/get-user-saved-local-cars-ids');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const saveUserLocalCars = async (id) => {
    try {
      const response = await baseService.post('saved-cars/save-local-car', {localCarsID:id});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteSavedLocalCar = async (id) => {
    try {
      const response = await baseService.put(`saved-cars/delete-local-car`, {localCarsID:id});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllLocalBids = async () => {
    try {
      const response = await baseService.get('local-cars-bids/get-user-all-bids');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getMyLocalCars = async () => {
    try {
      const response = await baseService.get('local-cars/get-user-all-local-cars');
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  