import { makeData } from "../../../utils/header-filters-data/make-data";
import { modelData } from "../../../utils/header-filters-data/model-data";

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
          name: 'Engine size',
          key: 'engine-size',
          submenu: {
            'Engine Size': ['4 Cylinder', '6 Cylinder', '8 Cylinder'],
          }
        },
        {
          name: 'Engine size, type, horsepower',
          key: 'engine-size-type-horsepower',
          submenu: {
            'Engine Size': ['4 Cylinder', '6 Cylinder', '8 Cylinder', 'Electric'],
            'Horsepower': ['100-200 HP', '200-300 HP', '300-400 HP', '400+ HP'],
            'Transmission': ['Automatic', 'Manual', 'CVT']
          }
        },
        {
          name: 'Body style',
          key: 'body-style',
          submenu: {
            'Car Types': ['Sedan', 'Coupe', 'Hatchback', 'Wagon'],
            'Truck Types': ['Pickup', 'Van', 'SUV', 'Crossover'],
            'Special Types': ['Convertible', 'Sports Car', 'Luxury', 'Off-road']
          }
        }
      ]
    },
    'How it works': { link: '/how-it-works' }, 
    'Help': { link: '/help' }, 
    'About Us': { link: '/about-us' }, 
    'Contact': { link: '/contact-us' }, 
    'Upload Car': { link: '/upload-local-car' }, 
    'Apply for loan': { link: '/apply-for-loan' } 
  }
