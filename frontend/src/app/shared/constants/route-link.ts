export const RouteLink = {
  loginRoute: 'log-in',
  registerRoute: 'register',
  dashboardRoute: 'dashboard',
  homeRoute: '',
  forgotPasswordRoute: 'forgot-password',
  resetPasswordRoute: 'reset-password',
  profileRoute: 'profile',
  changePasswordRoute: 'change-password',
  oauth2RedirectRoute: 'oauth2-redirect',

  // ProcessingLogin: 'đang xử lý đăng nhập ...',
  // settingRoute: 'setting',
  // aboutUsRoute: 'about-us',

  addressRoute: 'address',
  userRoute: 'user',

  /**
   * order route
   */
  orderRoute: 'orders',
  allRoute: 'all',
  pendingRoute: 'pending',
  shippedRoute: 'shipped',
  deliveredRoute: 'delivered',
  canceledRoute: 'canceled',
  couponRoute: 'coupon-list',

  /**
   * product
   */
  product: 'product',
  productDetail: 'product-detail',

  /**
   * admin
   */
  adminRoute: 'admin',

} as const;
