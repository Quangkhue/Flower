'use strict';

app.service('FileUploadSvc', ['$rootScope', 'FileUploader', 'AlertSvc', function($rootScope, FileUploader, AlertSvc){
    // create a uploader with options
    var uploadedFilesUrl = [];
    var successCb = [];
    var completeItemCb = [];
    var url = '/files/upload';
    if (window.location.hostname.indexOf('fmp') > -1) {
        url = "http://fmp.vastbit.com" + url;
    } else
    if (window.location.hostname.indexOf('localhost') > -1) {
        url = "http://doctornex.com" + url;
    }

    // Default uploader
    var uploader = new FileUploader({
        scope: $rootScope, // to automatically update the html. Default: $rootScope
        url: url,
        formData: [{
            key: 'value'
        }],
        isHTML5: true,
        path: '/files/'
    });

    function newUploader(scope){
        return new FileUploader({
            scope: scope, // to automatically update the html. Default: $rootScope
            url: url,
            formData: [{
                key: 'value'
            }],
            isHTML5: true,
            path: '/files/'
        });
    };

    // FILTERS AND CALLBACKS

    //uploader.filters.push({
    //  name: 'customFilter',
    //  fn: function () {
    //    return this.queue.length < 10;
    //  }
    //});

    // CALLBACKS
    // uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function (fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function (addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function (item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function (fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function (progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function (fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function (fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function (fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function (fileItem, response, status, headers) {
    //     console.log("File item: ", fileItem);
    //     completeItemCb(fileItem);
    // };
    // uploader.onCompleteAll = function () {
    //     if(!successCb){
    //         return;
    //     }
    //     successCb();
    //     successCb = null;
    //     completeItemCb = null;
    //     uploader.scope = null;
    // };

    function initCallBacks(u){
        u.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        u.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        u.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        u.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        u.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        u.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        u.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        u.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        u.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        u.onCompleteItem = function (fileItem, response, status, headers) {
            console.log("File item: ", fileItem);

            if(completeItemCb.length)
                completeItemCb[0](fileItem);
        };
        u.onCompleteAll = function () {
            if(!successCb || !successCb.length){
                return;
            }
            successCb[0]();
            //successCb = null;
            //completeItemCb = null;

            successCb.splice(0, 1);
            completeItemCb.splice(0, 1);
            //u.scope = null;
        };
    };

    // Init default call backs for uploader
    initCallBacks(uploader);

    this.initUploader = function(scope, scopeUploaders){
        uploader.scope = scope;

        if(scopeUploaders && scopeUploaders.length){
            angular.forEach(scopeUploaders, function(u){
                scope[u] = newUploader(scope);
                scope[u].queue.length = 0;
                initCallBacks(scope[u]);
            });
        } else {
            scope.uploader = uploader;
        }
    };

    // Export service funcs
    this.uploadAll = function(cb, onCompleteItemCb, scopeUploader){
        //successCb = cb;
        //completeItemCb = onCompleteItemCb;
        successCb.push(cb);
        completeItemCb.push(onCompleteItemCb);
        if(scopeUploader){
            scopeUploader.uploadAll();
        } else {
            uploader.uploadAll();
        }
    }

    this.limitFileSize = function(theUploader, limit){
        theUploader.filters.push({
            name: 'sizeFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var size = 0;
                if (item) {
                    size = item.size;
                }
                var limitSize = limit * 1024 * 1014;
                if (size >= limitSize){
                    AlertSvc.showErrorMsg($rootScope.getWord("Error"), "Dung lượng hình không vượt quá 1Mb.");
                }
                return size < limitSize
            }
        });
    };

    this.imageFilter = function(theUploader, fileTypes){
        // fileTypes example = '|jpg|png|jpeg|bmp|gif|'
        theUploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return fileTypes.indexOf(type) !== -1;
            }
        });
    };

    this.limitLength = function(theUploader, length){
        theUploader.filters.push({
            name: 'lengthFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < length
            }
        });
    }
}]);
