/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * M_bkUtils
 * This module contains the low level utilities used by Beaker
 */
(function () {
    'use strict';
    var module = angular.module('M_bkUtils', [
        'M_generalUtils',
        'M_angularUtils',
        'M_bkTrack'
    ]);
    /**
     * bkUtils
     * - holds any general utilities that are beaker specific that has no effect to DOM directly
     * - it also serves the purpose of hiding underneath utils: generalUtils/angularUtils/...
     *    from other parts of beaker
     */
    module.factory('bkUtils', function (
        generalUtils,
        angularUtils,
        trackingService) {

        var bkUtils = {
            loadingPlugins: {
                // for keeping track of loading plugin
                _loadingPlugins: {},
                add: function (key, value) {
                    this._loadingPlugins[key] = value;
                },
                get: function (key) {
                    return this._loadingPlugins[key];
                }
            },
            log: function (event, obj) {
                trackingService.log(event, obj);
            },
            refreshRootScope: function () {
                angularUtils.refreshRootScope();
            },
            getDefaultNotebook: function () {
                var deferred = angularUtils.newDeferred();
                angularUtils.httpGet("/beaker/rest/util/default").
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, header, config) {
                        deferred.reject(data, status, header, config);
                    });
                return deferred.promise;
            },
            loadJS: function (url, success) {
                generalUtils.loadJS(url, success);
            },
            loadList: function (urls, success, failure) {
                generalUtils.loadList(urls, success, failure);
            },
            findTable: function (elem) {
                return generalUtils.findTable(elem);
            },
            generateID: function () {
                return generalUtils.generateID(6);
            },
            toPrettyJson: function (jsObj) {
                return angularUtils.toPrettyJson(jsObj);
            },
            httpGet: function (url, data) {
                return angularUtils.httpGet(url, data);
            },
            httpPost: function (url, data) {
                return angularUtils.httpPost(url, data);
            },
            newDeferred: function () {
                return angularUtils.newDeferred();
            },
            newPromise: function () {
                return angularUtils.newPromise();
            },
            delay: function () {
                return angularUtils.delay();
            }
        };
        return bkUtils;
    });
})();