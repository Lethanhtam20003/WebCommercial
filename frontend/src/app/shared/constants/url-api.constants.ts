export const URL_API = {
    originUrl: 'http://localhost:8080',
    baseUrl: 'http://localhost:8080/api/v1',
    loginUrl: 'http://localhost:8080/api/v1/auth/login',
    registerUrl: 'http://localhost:8080/api/v1/auth/register',
    refreshTokenUrl: 'http://localhost:8080/api/v1/auth/refresh',
    introspect: 'http://localhost:8080/api/v1/auth/introspect',
    facebookLogin: 'http://localhost:8080/api/oauth2/authorization/facebook',
    googleLogin:   'http://localhost:8080/api/oauth2/authorization/google',
    productsUrl: 'http://localhost:8080/api/v1/products',
    catogoryUrl: 'http://localhost:8080/api/v1/category',
    checkProductNameExited: 'http://localhost:8080/api/v1/products/check-name',
    myInfo: 'http://localhost:8080/api/v1/users/myInfo',
    users: 'http://localhost:8080/api/v1/users',
    changePassword: 'http://localhost:8080/api/v1/users/myInfo/change-password'
} as const;
