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
      // {
      //   path: '/admin/configurations/company',
      //   title: 'Company',
      //   moduleName: 'profile',
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
        path: '/admin/configurations/department',
        title: 'Departments',
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
      {
        path: '/admin/configurations/vendor',
        title: 'Vendor',
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
      {
        path: '/admin/configurations/customer',
        title: 'Customer',
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
      {
        path: '/admin/configurations/product',
        title: 'Products',
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
    ],
  },

  {
    path: '/admin/purchases/main',
    title: 'Purchases',
    moduleName: 'purchases',
    iconType: 'feather',
    icon: 'shopping-cart',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_ADMIN'],
    submenu: [],
  },


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


  // dealer Modules
  {
    path: '/dealer/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_DEALER'],
    submenu: [],
  },

  {
    path: '/dealer/branches/main',
    title: 'Branches',
    moduleName: 'branches',
    iconType: 'feather',
    icon: 'git-branch',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_DEALER'],
    submenu: [],
  },
  
];
