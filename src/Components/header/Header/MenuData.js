import React from 'react';
import { Link } from 'react-router-dom';
import { BsLightningCharge } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

import { makeData } from "../../../utils/header-filters-data/make-data";
import { modelData } from "../../../utils/header-filters-data/model-data";
import { stateData } from "../../../utils/header-filters-data/state-data";
import { vehicleTypeOptions } from "../../../utils/header-filters-data/vehicle-type-data";

// Exporting the menu data as before
export const menuData = {
  'Search & Bid': {
    items: [
      {
        name: 'Makes',
        key: 'make',
        submenu: {
          make: makeData,
        },
      },
      {
        name: 'Models',
        key: 'model',
        submenu: {
          model: modelData,
        },
      },
      {
        name: 'Vehicle Type',
        key: 'vehicle-type',
        submenu: {
          'Vehicle Type': vehicleTypeOptions,
        },
      },
      {
        name: 'State',
        key: 'state',
        submenu: {
          State: stateData,
        },
      },
    ],
  },
  'How it Works': { link: '/how-it-works' },
  'Sell Your Car': { link: '/upload-local-car' },
  'Apply for Loan': { link: '/apply-for-loan' },
  'About Us': { link: '/about-us' },
};


