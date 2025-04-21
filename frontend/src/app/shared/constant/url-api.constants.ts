export class URL_API{
    static readonly originUrl: string = 'http://localhost:8080';
    static readonly baseUrl: string = 'http://localhost:8080/api/v1';
    static readonly loginUrl: string = `${URL_API.baseUrl}/auth/login`;
    static readonly refreshTokenUrl: string = `${URL_API.baseUrl}/auth/refresh`;
    static readonly checkAuthUrl: string = `${URL_API.baseUrl}/auth/check-auth`;
    static readonly facebookLogin: string = `http://localhost:8080/api/oauth2/authorization/facebook`;


}