import { makeData } from "../../../utils/header-filters-data/make-data";
import { modelData } from "../../../utils/header-filters-data/model-data";
import { stateData } from "../../../utils/header-filters-data/state-data";
import { vehicleTypeOptions } from "../../../utils/header-filters-data/vehicle-type-data";

export const menuData = {
    'Search & Bid': {
      items: [
        {
          name: 'Makes',
          key: 'make',
          submenu: {
            'make': makeData
          }
        },
        {
          name: 'Models',
          key: 'model',
          submenu: {
            'model': modelData
          }
        },
        {
          name: 'Vehicle Type',
          key: 'vehicle-type',
          submenu: {
            'Vehicle Type': vehicleTypeOptions
          }
        },
        {
          name: 'State',
          key: 'state',
          submenu: {
            'State': stateData
          }
        },
    
      ]
    },
    'How to Bid': { link: '/how-it-works' }, 
    'Rates': { link: '/fees' }, 
    'Sell Car': { link: '/upload-local-car' }, 
    'Pro Bidding Tips': { link: '/pro-bidding-tips' },
    'About Us': { link: '/about-us' },
    'Contact Us': { link: '/contact-us' }
  }