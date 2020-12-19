/* tslint:disable */
/* eslint-disable */
/**
 * RailsTsReact
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Post
 */
export interface Post {
    /**
     * 
     * @type {number}
     * @memberof Post
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    content: string;
}

export function PostFromJSON(json: any): Post {
    return PostFromJSONTyped(json, false);
}

export function PostFromJSONTyped(json: any, ignoreDiscriminator: boolean): Post {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'content': json['content'],
    };
}

export function PostToJSON(value?: Post | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'content': value.content,
    };
}


