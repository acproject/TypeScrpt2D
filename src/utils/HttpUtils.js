var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
    }
    HttpRequest.doGet = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, false, null, null);
        xhr.send();
        if (xhr.status === 200) {
            return { success: true, responseType: 'text', response: xhr.response };
        }
        else {
            return { success: false, responseType: 'text', response: null };
        }
    };
    HttpRequest.doGetAsync = function (url, callback, responseType) {
        if (responseType === void 0) { responseType = 'text'; }
        var xhr = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.onreadystatechange = function (ev) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = { success: true, responseType: responseType, response: xhr.response };
                callback(response);
            }
            else {
                var response = { success: false, responseType: responseType, response: null };
                callback(response);
            }
        };
        xhr.open('get', url, true, null, null);
        xhr.send();
    };
    return HttpRequest;
}());
export { HttpRequest };
// export type RequestBC = ((response:HttpResponse) => void);
// HttpRequest.doGetAsync('levec.proc', RequestBC => {
//     if(RequestBC.success === true) {
//         str: string = RequestBC.response as string;
//         tokenizer.setSource(str);
//         while()
//     }
// });
