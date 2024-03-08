import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MAIN',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },

  // Admin Modules
  {
    path: '/admin/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [],
  },
  {
    path: '/admin/payments/records',
    title: 'Payment Records',
    moduleName: 'payments',
    iconType: 'feather',
    icon: 'shopping-cart',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [],
  },
  // {
  //   path: '/manager/payments/records',
  //   title: 'Payment Records',
  //   moduleName: 'payments',
  //   iconType: 'feather',
  //   icon: 'shopping-cart',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['MANAGER'],
  //   submenu: [],
  // },
  {
    path: '',
    title: 'Configurations',
    moduleName: 'meetings',
    iconType: 'feather',
    icon: 'slack',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [
      {
        path: '/admin/business-profile/create',
        title: 'Business Profile',
        moduleName: 'profile',
        iconType: 'feather',
        icon: 'layers',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_ADMIN'],
        submenu: [],
      },
      // {
      //   path: '/admin/departments',
      //   title: 'Departments',
      //   moduleName: 'departments',
      //   iconType: 'feather',
      //   icon: 'layers',
      //   class: '',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: ['ROLE_ADMIN'],
      //   submenu: [],
      // },
      {
        path: '/admin/counties',
        title: 'Counties',
        moduleName: 'counties',
        iconType: 'feather',
        icon: 'layers',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_ADMIN'],
        submenu: [],
      },
      {
        path: '/admin/sub-counties',
        title: 'Sub Counties',
        moduleName: 'subcounties',
        iconType: 'feather',
        icon: 'layers',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_ADMIN'],
        submenu: [],
      },
      // {
      //   path: "/admin/routes",
      //   title: "Routes",
      //   moduleName: "routes",
      //   iconType: "feather",
      //   icon: "slack",
      //   class: "",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["ROLE_ADMIN"],
      //   submenu: [],
      // },
      {
        path: "/admin/pickup-locations",
        title: "Routes",
        moduleName: "pickup",
        iconType: "feather",
        icon: "layers",
        class: "",
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_ADMIN'],
        submenu: [],
      },
    ],
  },

  // {
  //   path: '/admin/user-accounts/collectors',
  //   title: 'Milk Collectors',
  //   moduleName: 'users',
  //   iconType: 'feather',
  //   icon: 'monitor',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_ADMIN'],
  //   submenu: [],
  // },

  // {
  //   path: '/admin/users/staff',
  //   title: 'Back Office Staff',
  //   moduleName: 'users',
  //   iconType: 'feather',
  //   icon: 'monitor',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_ADMIN'],
  //   submenu: [],
  // },
  // {
  //   path: '/admin/users/sales',
  //   title: 'Sales Team',
  //   moduleName: 'users',
  //   iconType: 'feather',
  //   icon: 'monitor',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_ADMIN'],
  //   submenu: [],
  // },

  // {
  //   path: "",
  //   title: "User Accounts",
  //   moduleName: "users",
  //   iconType: "feather",
  //   icon: "users",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_ADMIN"],
  //   submenu: [
  //     {
  //       path: "/admin/users",
  //       title: "All Accounts",
  //       moduleName: "users",
  //       iconType: "feather",
  //       icon: "monitor",
  //       class: "",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: ["ROLE_ADMIN"],
  //       submenu: [],
  //     },
  //     {
  //       path: "/admin/users/collectors",
  //       title: "Milk Collectors",
  //       moduleName: "users",
  //       iconType: "feather",
  //       icon: "monitor",
  //       class: "",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: ["ROLE_ADMIN"],
  //       submenu: [],
  //     },
  //     {
  //       path: "/admin/users/staff",
  //       title: "Back Office Staff",
  //       moduleName: "users",
  //       iconType: "feather",
  //       icon: "monitor",
  //       class: "",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: ["ROLE_ADMIN"],
  //       submenu: [],
  //     },
  //     {
  //       path: "/admin/users/sales",
  //       title: "Sales Team",
  //       moduleName: "users",
  //       iconType: "feather",
  //       icon: "monitor",
  //       class: "",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: ["ROLE_ADMIN"],
  //       submenu: [],
  //     }
  //   ],
  // },

  // {
  //   path: "/admin/roles",
  //   title: "User Roles",
  //   moduleName: "roles",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_ADMIN"],
  //   submenu: [],
  // },

  {
    path: '',
    title: 'Roles',
    moduleName: 'RolesModule',
    iconType: 'feather',
    icon: 'book',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [
      {
        path: '/admin/roles/add',
        title: 'Add Role',
        moduleName: 'RolesModule',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },

      {
        path: '/admin/roles/view',
        title: 'View Role',
        moduleName: 'RolesModule',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'User Accounts',
    moduleName: 'user-accounts',
    iconType: 'feather',
    icon: 'user',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [
      {
        path: '/admin/user-accounts/add-account',
        title: 'Add Account',
        moduleName: 'add-account',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/user-accounts/all',
        title: 'All Accounts',
        moduleName: 'active-accounts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/user-accounts/locked-accounts',
        title: 'Locked Accounts',
        moduleName: 'locked-accounts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/user-accounts/deleted-accounts',
        title: 'Deleted Accounts',
        moduleName: 'deleted-accounts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },

  // Staff Modules
  {
    path: '/staff/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [],
  },
  {
    path: '/staff/sales/collections',
    title: 'Collections',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'layers',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [],
  },
  // {
  //   path: '/staff/sales/totals-collections',
  //   title: 'Totals Collections',
  //   moduleName: 'sales',
  //   iconType: 'feather',
  //   icon: 'layers',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  // {
  //   path: '/staff/product-sales',
  //   title: 'Sales Summary',
  //   moduleName: 'product-sales',
  //   iconType: 'feather',
  //   icon: 'briefcase',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  {
    path: '/staff/farmers/farmers',
    title: 'Farmers',
    moduleName: 'farmers',
    iconType: 'feather',
    icon: 'cloud-rain',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [],
  },
  // {
  //   path: '/staff/customers',
  //   title: 'Customers',
  //   moduleName: 'customers',
  //   iconType: 'feather',
  //   icon: 'divide',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  // {
  //   path: '/staff/sales/allocations',
  //   title: 'Milk Allocations',
  //   moduleName: 'sales',
  //   iconType: 'feather',
  //   icon: 'activity',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  // {
  //   path: '/staff/sales/sales',
  //   title: 'Payment Records',
  //   moduleName: 'sales',
  //   iconType: 'feather',
  //   icon: 'shopping-cart',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },

  // {
  //   path: '/staff/configs',
  //   title: 'Price Management',
  //   moduleName: 'users',
  //   iconType: 'feather',
  //   icon: 'slack',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  

  // {
  //   path: '/staff/cans',
  //   title: 'Delivery Cans',
  //   moduleName: 'milk-cans',
  //   iconType: 'feather',
  //   icon: 'thermometer',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },

  // {
  //   path: '/staff/stock-categories',
  //   title: 'Stock Categories',
  //   moduleName: 'stock-categories',
  //   iconType: 'feather',
  //   icon: 'server',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },
  // {
  //   path: '/staff/inventory',
  //   title: 'Inventory Management',
  //   moduleName: 'inventory',
  //   iconType: 'feather',
  //   icon: 'database',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['ROLE_STAFF'],
  //   submenu: [],
  // },

  {
    path: '/staff/sales/products/sales',
    title: 'Advanced Payments',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'dollar-sign',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [],
  },
  {
    path: '/reports/main',
    title: 'Reports',
    moduleName: 'reports',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [],
  },
  
  {
    path: '',
    title: 'Bulk SMS',
    moduleName: 'sms',
    iconType: 'feather',
    icon: 'message-square',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_STAFF'],
    submenu: [
      {
        path: '/staff/sms/template',
        title: 'SMS Templates',
        moduleName: 'sms',
        iconType: 'feather',
        icon: 'message-square',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_STAFF'],
        submenu: [],
      },
      {
        path: '/staff/sms/bulk',
        title: 'Send Bulk SMS',
        moduleName: 'sms',
        iconType: 'feather',
        icon: 'message-square',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['ROLE_STAFF'],
        submenu: [],
      },
    ]
  },
  {
    path: '/sales-person/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['SALES_PERSON'],
    submenu: [],
  },
  {
    path: '/manager/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
    path: '/managing-director/dashboard/main',
    title: 'Sales Summary',
    moduleName: 'product-sales',
    iconType: 'feather',
    icon: 'briefcase',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGING_DIRECTOR'],
    submenu: [],
  },
  {
    path: '/manager/dashboard/records',
    title: 'Payment Records',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'shopping-cart',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
    path: '/manager/product-sales',
    title: 'Sales Summary',
    moduleName: 'product-sales',
    iconType: 'feather',
    icon: 'briefcase',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
    path: '/manager/sales/allocations',
    title: 'Milk Allocations',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'activity',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
    path: '',
    title: 'Bulk SMS',
    moduleName: 'sms',
    iconType: 'feather',
    icon: 'message-square',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [
      {
        path: '/manager/sms/template',
        title: 'SMS Templates',
        moduleName: 'sms',
        iconType: 'feather',
        icon: 'message-square',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['MANAGER'],
        submenu: [],
      },
      {
        path: '/manager/sms/bulk',
        title: 'Send Bulk SMS',
        moduleName: 'sms',
        iconType: 'feather',
        icon: 'message-square',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['MANAGER'],
        submenu: [],
      },
    ]
  },
  
  {
    path: '/reports/main/',
    title: 'Reports',
    moduleName: 'reports',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
  path: '/totals-collector/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['TOTALS_COLLECTOR'],
    submenu: [],
  },
  {
    path: '/totals-collector/sales/totals-collections',
    title: 'Totals Collections',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'layers',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['TOTALS_COLLECTOR'],
    submenu: [],
  },
  {
    path: '/manager/sales/totals-collections',
    title: 'Totals Collections',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'layers',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGER'],
    submenu: [],
  },
  {
    path: '/reports/main',
    title: 'Reports',
    moduleName: 'reports',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['MANAGING_DIRECTOR'],
    submenu: [],
  },
  {
    path: '/accountant/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ACCOUNTANT'],
    submenu: [],
  },
  {
    path: '/accountant/dashboard/records',
    title: 'Payment Records',
    moduleName: 'payments',
    iconType: 'feather',
    icon: 'shopping-cart',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ACCOUNTANT'],
    submenu: [],
  },
  {
    path: '/accountant/product-sales',
    title: 'Sales Summary',
    moduleName: 'product-sales',
    iconType: 'feather',
    icon: 'briefcase',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ACCOUTANT'],
    submenu: [],
  },
  {
    path: '/accountant/sales/totals-collections',
    title: 'Totals Collections',
    moduleName: 'sales',
    iconType: 'feather',
    icon: 'layers',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ACCOUNTANT'],
    submenu: [],
  },
  {
  path: '/accountant/customers',
  title: 'Customers',
  moduleName: 'customers',
  iconType: 'feather',
  icon: 'divide',
  class: '',
  groupTitle: false,
  badge: '',
  badgeClass: '',
  role: ['ACCOUNTANT'],
  submenu: [],
},
{
path: '/reports/main',
title: 'Reports',
moduleName: 'reports',
iconType: 'feather',
icon: 'file-text',
class: '',
groupTitle: false,
badge: '',
badgeClass: '',
role: ['ACCOUNTANT'],
submenu: [],
},

];
