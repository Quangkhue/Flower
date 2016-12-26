'use strict';
var host = "http://localhost:8080/v1/"
var API_URL = {
    PRODUCT: {
        LIST: host + "products",
        LIST_BY_CAT: host + "products/categories",
        NEW: host + "products",
        UPDATE: host + "products/",
        DETAIL: host + "products/",
        DELETE: host + "products/"
    },
    CATEGORY: {
        LIST: host + "categories",
        NEW: host + "categories",
        UPDATE: host + "categories/",
        DETAIL: host + "categories/",
        DELETE: host + "categories/"
    }
}
