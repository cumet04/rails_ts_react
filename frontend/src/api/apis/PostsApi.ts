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
    Post,
    PostFromJSON,
    PostToJSON,
    PostSummary,
    PostSummaryFromJSON,
    PostSummaryToJSON,
} from '../models';

export interface GetPostsIdRequest {
    id: number;
}

/**
 * 
 */
export class PostsApi extends runtime.BaseAPI {

    /**
     * available post list
     */
    async getPostsRaw(): Promise<runtime.ApiResponse<Array<PostSummary>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/posts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PostSummaryFromJSON));
    }

    /**
     * available post list
     */
    async getPosts(): Promise<Array<PostSummary>> {
        const response = await this.getPostsRaw();
        return await response.value();
    }

    /**
     * post detail
     */
    async getPostsIdRaw(requestParameters: GetPostsIdRequest): Promise<runtime.ApiResponse<Post>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPostsId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/posts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PostFromJSON(jsonValue));
    }

    /**
     * post detail
     */
    async getPostsId(requestParameters: GetPostsIdRequest): Promise<Post> {
        const response = await this.getPostsIdRaw(requestParameters);
        return await response.value();
    }

}
