import category1 from '../../../assets/categories/1.jpg';
import category2 from '../../../assets/categories/2.jpg';
import category3 from '../../../assets/categories/3.jpg';
import category4 from '../../../assets/categories/4.jpg';
import category7 from '../../../assets/categories/7.jpg';
import category9 from '../../../assets/categories/9.jpg';

export const CATEGORIES = [
  {
    id: 'personal-protective-equipment',
    image: category1,
    translationKey: 'categories.personalProtectiveEquipment',
    productCount: 50,
    // Large card: spans 2 columns, 2 rows (top-left)
    colStart: 1,
    colEnd: 3,
    rowStart: 1,
    rowEnd: 3,
    maxHeight: '',
  },
  {
    id: 'heavy-machinery',
    image: category4,
    translationKey: 'categories.heavyMachinery',
    productCount: 50,
    // Wide card: spans 2 columns, 1 row (bottom-left)
    colStart: 3,
    colEnd: 5,
    rowStart: 1,
    rowEnd: 2,
    maxHeight: '256px',
  },
  {
    id: 'building-materials',
    image: category2,
    translationKey: 'categories.buildingMaterials',
    productCount: 50,
    // Tall card: spans 1 column, 3 rows (right side)
    colStart: 1,
    colEnd: 3,
    rowStart: 2,
    rowEnd: 3,
    maxHeight: '',
  },
  {
    id: 'maintenance-accessories',
    image: category9,
    translationKey: 'categories.maintenanceAccessories',
    productCount: 50,
    // Regular card: bottom-right
    colStart: 3,
    colEnd: 5,
    rowStart: 2,
    rowEnd: 3,
    maxHeight: '',
  },
  {
    id: 'electrical-equipment',
    image: category3,
    translationKey: 'categories.electricalEquipment',
    productCount: 50,
    // Regular card: top middle-right
    colStart: 3,
    colEnd: 4,
    rowStart: 1,
    rowEnd: 2,
    maxHeight: '',
  },
 
  {
    id: 'hand-tools',
    image: category7,
    translationKey: 'categories.handTools',
    productCount: 50,
    // Regular card: middle-right
    colStart: 3,
    colEnd: 4,
    rowStart: 2,
    rowEnd: 3,
    maxHeight: '',
  },
 
];
