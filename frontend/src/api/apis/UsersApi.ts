/* tslint:disable */
/* eslint-disable */
/**
 * RailsTsReact
 * RailsTsReact
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * current user
     * Your GET endpoint
     */
    async getUsersCurrentRaw(): Promise<runtime.ApiResponse<User>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/current`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * current user
     * Your GET endpoint
     */
    async getUsersCurrent(): Promise<User> {
        const response = await this.getUsersCurrentRaw();
        return await response.value();
    }

}
